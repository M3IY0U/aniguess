<script lang="ts">
  import type { Guess } from "./util/Guess";
  import { gameState, pastGuesses } from "./util/stores";

  let list: Array<Guess> = [];

  pastGuesses.subscribe((guesses) => {
    list = [];

    guesses.forEach((guess) => {
      list.push(guess);
    });

    const children = document.getElementById("past-guesses")?.children;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        children[i].classList.remove("failure", "skip", "success");
      }
    }
  });
</script>

{#if $gameState != "idle"}
  <div id="guesses-container">
    <h3>Guesses</h3>
    <ul id="past-guesses">
      {#each list as guess}
        <li class={guess.type.toString()}>{guess.text}</li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  #guesses-container {
    float: right;
    margin: 10px 10px;
    width: 650px;
    overflow-x: hidden;
  }

  h3 {
    font-size: 2em;
    margin: 0;
    text-align: end;
    color: white;
  }

  #past-guesses {
    list-style-type: none;
    padding: 0;
    margin: 0;
    float: right;
    text-align: end;
  }

  :global(#past-guesses li) {
    max-width: 430px;
    font-size: 1.5em;
    margin: 5px 0;
    padding: 10px;
    border: 2px solid #707070;
    color: white;
    border-radius: 10px;
    transition: border-color 2s ease-in;
  }

  .failure {
    border-color: #f03a17 !important;
  }
  .skip {
    border-color: #0078d7 !important;
  }
  .success {
    border-color: #16c60c !important;
  }
</style>
