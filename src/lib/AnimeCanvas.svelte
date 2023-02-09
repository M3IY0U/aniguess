<script lang="ts">
  import { guessProgress, toGuess, gameState } from "./util/stores";
  import { onMount } from "svelte";
  import {
    drawPixelImage,
    flashEmoji,
    imgHeight,
    imgWidth,
  } from "./util/utilities";

  let canvas: HTMLCanvasElement;
  let image = new Image();

  toGuess.subscribe((e) => {
    if (e == null) return;

    image.src = e.coverImage;
  });

  onMount(() => {
    image.onload = () => drawPixelImage(canvas, image, 0);

    guessProgress.subscribe((n) => {
      drawPixelImage(canvas, image, n);
      if (n >= 6) {
        drawPixelImage(canvas, image, 100);
      }
    });

    gameState.subscribe((s) => {
      if (s == "win") {
        canvas.classList.add("success");
        flashEmoji("🎉");
      } else if (s == "loss") {
        canvas.classList.add("failure");
        flashEmoji("💀");
      }
    });
  });
</script>

<div class="banner-container">
  <canvas
    id="anime-image"
    width={imgWidth}
    height={imgHeight}
    bind:this={canvas}
  />
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
  }

  #anime-image {
    border-radius: 15px;
    align-self: center;
  }

  :global(.success) {
    border: 4px solid #4caf50;
    border-radius: 5px;
  }

  :global(.failure) {
    border: 4px solid #f44336;
    border-radius: 5px;
  }

  .banner-container {
    width: 100%;
    height: 638px;
  }
</style>
