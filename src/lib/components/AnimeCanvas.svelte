<script lang="ts">
  import { guessProgress, toGuess, gameState, gameMode } from "../util/stores";
  import { onMount } from "svelte";
  import { drawImage, imgWidth, imgHeight } from "../util/Drawing";
  import { browser } from "$app/environment";

  let canvas: HTMLCanvasElement;
  let image = browser ? new Image() : null;

  toGuess.subscribe((e) => {
    if (e == null) return;

    image!.src = e.coverImage;
  });

  onMount(() => {
    if (!browser) return;
    image!.onload = () => {
      if ($gameState == "win" || $gameState == "loss") {
        drawImage($gameMode, canvas, image!, 6);
      } else {
        drawImage($gameMode, canvas, image!, 0);
      }
    };

    guessProgress.subscribe((n) => {
      drawImage($gameMode, canvas, image!, n);
    });

    gameMode.subscribe(() => {
      canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i <= $guessProgress; i++) {
        drawImage($gameMode, canvas, image!, i);
      }
    });
  });
</script>

<div class="banner-container">
  <canvas id="anime-image" width={imgWidth} height={imgHeight} bind:this={canvas} />
  <div id="result-emoji" style="opacity: 0%;" />
</div>

<style>
  :global(#result-emoji) {
    pointer-events: none;
    text-align: center;
    transform: translate(-50%, 0%);
    position: absolute;
    padding: 0;
    margin: 0;
    left: 50%;
    top: 20%;
    display: block;
    font-size: 15em;
    margin: 0;
    text-align: center;
    transition: opacity 0.4s ease-in-out;
    z-index: 10;
  }

  #anime-image {
    border-radius: 10px;
    align-self: center;
  }

  :global(.success) {
    border: 4px solid #4caf50;
  }

  :global(.failure) {
    border: 4px solid #f44336;
  }

  .banner-container {
    width: 100%;
    height: 638px;
  }
</style>
