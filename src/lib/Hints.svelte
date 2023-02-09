<script lang="ts">
  import { onMount, tick } from "svelte";
  import { gameState, guessProgress, toGuess } from "./util/stores";

  onMount(() => {
    guessProgress.subscribe(async (n) => {
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
      hint.classList.add("hint");
      await tick();
      const children = document.getElementById("hint-list")?.children;
      if (children) {
        for (const child of children) {
          child.classList.remove("hint");
        }
      }
      document.getElementById("hint-list").appendChild(hint);
    });
  });
</script>

{#if $gameState != "idle"}
  <div id="hint-container">
    <h3>Hints</h3>
    <ul id="hint-list" />
  </div>
{/if}

<style>
  #hint-container {
    float: left;
    margin: 10px 10px;
    width: 650px;
    overflow-x: hidden;
  }

  h3 {
    font-size: 2em;
    margin: 0;
    text-align: start;
    color: white;
  }

  #hint-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    float: left;
    text-align: start;
    display: flex;
    flex-direction: column;
  }

  :global(#hint-list li) {
    max-width: 430px;
    overflow-x: hidden;
    font-size: 1.5em;
    margin: 5px 0;
    padding: 10px;
    border: 2px solid #707070;
    color: white;
    border-radius: 10px;
    transition: border-color 2s ease-in;
    align-self: flex-start;
    width: fit-content;
  }

  :global(#hint-list .hint) {
    border-color: #ffd679;
  }
</style>
