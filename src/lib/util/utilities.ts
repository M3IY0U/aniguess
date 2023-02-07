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
  [...document.getElementsByClassName("action-buttons")[0].children].forEach(
    (button) => {
      button.setAttribute("disabled", "");
    }
  );

  document.getElementById("guess-input").setAttribute("disabled", "");

  document.getElementById("guess-info").setAttribute("style", "font-size: 3em");
}

    document
      .getElementById("guess-info")
      .setAttribute("style", "font-size: 3em");
  }