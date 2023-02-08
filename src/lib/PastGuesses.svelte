<script lang="ts">
  import { gameState, pastGuesses } from "./util/stores";

  let list: Array<string> = [];

  pastGuesses.subscribe((guesses) => {
    list = [];

    guesses.forEach((guess) => {
      list.push(guess);
    });
  });
</script>

{#if $gameState != "idle" }
  <div id="guesses-container">
    <h3>Guesses</h3>
    <ul id="past-guesses" >
      {#each list as guess}
        <li>{guess}</li>
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
    border-radius: 5px;
  }
</style>
