<script lang="ts">
  import { guessProgress, toGuess } from "./util/stores";
  import Hints from "./Hints.svelte";
  import { onMount } from "svelte";

  const imgWidth = 450;
  const imgHeight = 630;
  let canvas: HTMLCanvasElement;
  let image = new Image();

  toGuess.subscribe((e) => {
    image.src = e.coverImage;
  });

  onMount(() => {
    setTimeout(() => {
    guessProgress.subscribe((n) => {
      drawPixelImage(canvas, image, n * 2);
      if (n == 6) {
        drawPixelImage(canvas, image, 100);
      }
    });
    
    image.src = $toGuess.coverImage;
    drawPixelImage(canvas, image, 1);
  }, 100);
  });

  function drawPixelImage (canvas, image, scale) {
    scale *= 0.01;

    var scaledW = imgWidth * scale;
    var scaledH = imgHeight * scale;

    var ctx = canvas.getContext('2d');

    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(image, 0, 0, scaledW, scaledH);
    ctx.drawImage(canvas, 0, 0, scaledW, scaledH, 0, 0, imgWidth, imgHeight);
  };

</script>

<div class="banner-container">
  <canvas id="anime-image" width="{imgWidth}" height="{imgHeight}" bind:this={canvas} />
  <Hints />
</div>

<style>
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
    display: flex;
    flex-direction: row;
    align-self: space-between;
  }
</style>
