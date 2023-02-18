import { gql, request } from "graphql-request";

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

  try {
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(image, 0, 0, scaledW, scaledH);
    ctx.drawImage(canvas, 0, 0, scaledW, scaledH, 0, 0, imgWidth, imgHeight);
  } catch (error) {
    // ignored
  }
}

export function addToGuessesSoFar(id: number) {
  let guessesSoFar =
    JSON.parse(sessionStorage.getItem("guesses-so-far")) || new Array<string>();
  guessesSoFar.push(id);
  sessionStorage.setItem("guesses-so-far", JSON.stringify(guessesSoFar));
}

export function setGuessInfoText(url: string, title?: string) {
  let gi = document.getElementById("guess-info");

  if (!title) {
    gi.innerHTML = `Correct! Here it is <a target="_blank" href="${url}">on Anilist</a>`;
    return;
  }
  gi.innerHTML = `You lose, the correct answer was: <a target="_blank" href="${url}">${title}</a>`;
}

export const shouldClose = (e: MouseEvent | KeyboardEvent) => {
  if (e instanceof MouseEvent) {
    return e.target === e.currentTarget;
  } else {
    return e.key === "Escape";
  }
};

export async function getMediaListFromAnilist(name: string) {
  let entries = [];

  await request(
    "https://graphql.anilist.co",
    gql`
      {
        MediaListCollection(userName: "$user", type: ANIME) {
          lists {
            entries {
              mediaId
            }
          }
        }
      }
    `.replace("$user", name)
  ).then((data) => {
    data.MediaListCollection.lists.forEach((list) => {
      entries.push(list.entries.map((entry) => entry.mediaId));
    });
  });
  return entries.flat();
}
