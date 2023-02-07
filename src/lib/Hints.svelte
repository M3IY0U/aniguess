<script lang="ts">
  import { onMount } from "svelte";
  import { guessProgress, toGuess } from "./util/stores";

  onMount(() => {
    guessProgress.subscribe((n) => {
      if (n < 1) return;
      var hint = document.createElement("li");
      switch (n) {
        case 1:
          hint.innerText = `Average Score: ${$toGuess.averageScore}`;
          break;
        case 2:
          hint.innerText = `Started in: ${$toGuess.startDate}`;
          break;
        case 3:
          hint.innerText = `Main Studio: ${$toGuess.studios}`;
          break;
        case 4:
          hint.innerText = `Genres: ${$toGuess.genres}`;
          break;
        case 5:
          hint.innerText = `Popular Character: ${$toGuess.mainCharacter}`;
          break;
        default:
          break;
      }
      document.getElementById("hint-list").appendChild(hint);
    });
  });
</script>

<div id="hint-container" style="display:none">
  <h2>Hints</h2>
<ul id="hint-list"  />
</div>
<style>
  #hint-container {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: center;
    margin: 10px 10px;
  }

  #hint-list {
    align-self: center;
    justify-content: center;
    margin: 10px 15px;
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease-in-out;
    text-align: center;
  }

  h2 {
    font-size: 2.5em;
    margin: 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    white-space: nowrap;
  }

  :global(li) {
    width: fit-content;
    font-size: 2em;
    margin: auto;
  }

</style>
