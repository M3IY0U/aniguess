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

export function drawCroppedImage(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  scale: number
) {
  let { x, y } = getNoOverlapPosition();
  pastLocations.push({ x1: x, y1: y, x2: x + regionSize, y2: y + regionSize });

  var ctx = canvas.getContext("2d");

  if (scale < 6) {
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
  let x = Math.floor(Math.random() * (imgWidth - regionSize + 1));
  let y = Math.floor(Math.random() * (imgHeight - regionSize + 1));
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
