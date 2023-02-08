export function lose(url: string, title: string) {
  document.getElementById("anime-image").classList.add("failure");

  document.getElementById(
    "guess-info"
  ).innerHTML = `You lose, the correct answer was: <a target="_blank" href="${url}">${title}</a>`;
  document.getElementById("result-text").innerText = "💀";
  document
    .getElementById("result-text")
    .setAttribute("style", "opacity: 100%;");
  gameEnd();
}
export function win(url: string) {
  document.getElementById("anime-image").classList.add("success");
  document.getElementById(
    "guess-info"
  ).innerHTML = `Correct! Here it is <a target="_blank" href="${url}">on Anilist</a>`;
  document.getElementById("result-text").innerText = "🎉";
  document
    .getElementById("result-text")
    .setAttribute("style", "opacity: 100%;");

  gameEnd();
}

export function gameEnd() {
  setTimeout(() => {
    document
      .getElementById("result-text")
      .setAttribute("style", "opacity: 0%;");
  }, 1000);

  document.getElementById("guess-info").setAttribute("style", "font-size: 3em");
}

export const imgWidth = 450;
export const imgHeight = 630;

export function drawPixelImage(canvas, image, scale) {
  scale = [90, 45, 30, 18, 15, 6, 1][scale];

  var scaledW = imgWidth / scale;
  var scaledH = imgHeight / scale;

  var ctx = canvas.getContext("2d");
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  ctx.drawImage(image, 0, 0, scaledW, scaledH);
  ctx.drawImage(canvas, 0, 0, scaledW, scaledH, 0, 0, imgWidth, imgHeight);
}
