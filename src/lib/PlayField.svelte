<script lang="ts">
  import eightBit from "8bit";
  import { guessProgress, toGuess } from "./util/stores";
  import Hints from "./Hints.svelte";
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;
  let image = new Image();

  toGuess.subscribe((e) => {
    image.src = e.coverImage;
  });

  onMount(() => {
    setTimeout(() => {
    guessProgress.subscribe((n) => {
      eightBit(canvas, image, n * 2);
      if (n == 6) {
        eightBit(canvas, image, 100);
      }
    });

    eightBit(canvas, image, 1);
  }, 100);
  });

</script>

<div class="banner-container">
  <canvas id="anime-image" width="450px" height="700px" bind:this={canvas} />
  <Hints />
</div>

<style>
  #anime-image {
    border-radius: 15px;
    width: 450px;
    height: 700px;
    align-self: center;
    margin-right: 5px;
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
    border-radius: 15px;
  }
</style>
