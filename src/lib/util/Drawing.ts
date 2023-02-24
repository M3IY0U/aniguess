import { Gamemode } from "./Enums";

export const imgWidth = 450;
export const imgHeight = 630;

export function drawImage(
  gm: Gamemode,
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  scale: number
) {
  try {
    switch (gm) {
      case Gamemode.Pixelated:
        drawPixelImage(canvas, image, scale);
        break;
      case Gamemode.Cropped:
        drawCroppedImage(canvas, image, scale);
        break;
      default:
    }
  } catch (error) {
    // ignored
  }
}

export function drawPixelImage(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  scale: number
) {
  scale = [90, 45, 30, 18, 15, 6, 1][scale];

  var scaledW = imgWidth / scale;
  var scaledH = imgHeight / scale;

  var ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  ctx.drawImage(image, 0, 0, scaledW, scaledH);
  ctx.drawImage(canvas, 0, 0, scaledW, scaledH, 0, 0, imgWidth, imgHeight);
}

const regionSize = parseInt(localStorage.getItem("crop-size")) || 100;
const pastLocations = [];

// shoutout https://stackoverflow.com/a/19593950
function roundedImage(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + size - radius, y);
  ctx.quadraticCurveTo(x + size, y, x + size, y + radius);
  ctx.lineTo(x + size, y + size - radius);
  ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size);
  ctx.lineTo(x + radius, y + size);
  ctx.quadraticCurveTo(x, y + size, x, y + size - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.clip();
}

export function drawCroppedImage(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  scale: number
) {
  let { x, y } = getNoOverlapPosition();
  pastLocations.push({ x1: x, y1: y, x2: x + regionSize, y2: y + regionSize });

  var ctx = canvas.getContext("2d");

  if (scale < 6) {
    ctx.save();
    roundedImage(ctx, x, y, regionSize, 10);
    ctx.drawImage(
      image,
      x,
      y,
      regionSize,
      regionSize,
      x,
      y,
      regionSize,
      regionSize
    );
    ctx.restore();
  } else {
    ctx.drawImage(
      image,
      0,
      0,
      imgWidth,
      imgHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }
}

function randomPointOnCanvas() {
  let x = Math.floor(Math.random() * (imgWidth - regionSize));
  let y = Math.floor(Math.random() * (imgHeight - regionSize));
  return { x, y };
}

function getNoOverlapPosition() {
  if (pastLocations.length === 0) {
    return randomPointOnCanvas();
  }

  let { x, y } = randomPointOnCanvas();
  let overlap = false;
  for (let i = 0; i < pastLocations.length; i++) {
    let { x1, y1, x2, y2 } = pastLocations[i];
    if (x < x2 && x + regionSize > x1 && y < y2 && y + regionSize > y1) {
      overlap = true;
      break;
    }
  }

  return overlap ? getNoOverlapPosition() : { x, y };
}
