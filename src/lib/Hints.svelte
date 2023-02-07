<script lang="ts">
  import { onMount } from "svelte";
  import { guessProgress, toGuess } from "./util/stores";

  onMount(() => {
    guessProgress.subscribe((n) => {
      if (n < 1) return;
      var hint = document.createElement("li");
      switch (n) {
        case 1:
          hint.innerText = `💡 Average Score: ${$toGuess.averageScore}`;
          break;
        case 2:
          hint.innerText = `💡 Started in: ${$toGuess.startDate}`;
          break;
        case 3:
          hint.innerText = `💡 Main Studio: ${$toGuess.studios}`;
          break;
        case 4:
          hint.innerText = `💡 Genres: ${$toGuess.genres}`;
          break;
        case 5:
          hint.innerText = `💡 Popular Character: ${$toGuess.mainCharacter}`;
          break;
        default:
          return;
      }
      hint.title = hint.innerText;
      document.getElementById("hint-list").appendChild(hint);
    });
  });
</script>

<div id="hint-container" style="display:none">
  <h3>Hints</h3>
  <ul id="hint-list" />
</div>

<style>
  #hint-container {
    float: left;
    margin: 10px 10px;
    white-space: nowrap;
    width: 650px;
    overflow-x: hidden;
  }

  h3 {
    font-size: 2em;
    margin: 0;
    text-align: start;
  }

  #hint-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    float: left;
    text-align: start;
  }

  :global(#hint-list li) {
    width: 430px;
    overflow-x: hidden;
    font-size: 1.5em;
    margin: 5px 0;
    padding: 10px;
    border: 2px solid rgb(127, 127, 127);
    border-radius: 5px;
  }
</style>
