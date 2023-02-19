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

export function drawCroppedImage(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  scale: number
) {
  var scaledW = (scale + 1) * 30;
  var scaledH = (scale + 1) * 30;

  var x = Math.floor(Math.random() * (image.width - 40)) + 20;
  var y = Math.floor(Math.random() * (image.height - 40)) + 20;
  console.log(x, y);

  var ctx = canvas.getContext("2d");

  if (scale < 6) {
    ctx.drawImage(image, x, y, scaledW, scaledH, x, y, scaledW, scaledH);
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
