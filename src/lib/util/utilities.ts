export function flashEmoji(emoji: string) {
  var div = document.getElementById("result-emoji");
  div.innerText = emoji;
  div.setAttribute("style", "opacity: 100%;");
  setTimeout(() => {
    div.setAttribute("style", "opacity: 0%;");
  }, 500);
}

export const imgWidth = 450;
export const imgHeight = 630;

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

export function addToGuessesSoFar(id: string) {
  let guessesSoFar =
    JSON.parse(sessionStorage.getItem("guessesSoFar")) || new Array<string>();
  guessesSoFar.push(id);
  sessionStorage.setItem("guessesSoFar", JSON.stringify(guessesSoFar));
}

export function setGuessInfoText(url: string, title?: string) {
  let gi = document.getElementById("guess-info");

  if (!title) {
    gi.innerHTML = `Correct! Here it is <a target="_blank" href="${url}">on Anilist</a>`;
    return;
  }
  gi.innerHTML = `You lose, the correct answer was: <a target="_blank" href="${url}">${title}</a>`;
}
