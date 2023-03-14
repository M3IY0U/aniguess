<script lang="ts">
  import AnimeCanvas from "./AnimeCanvas.svelte";
  import GuessForm from "./GuessForm.svelte";
  import Hints from "./Hints.svelte";
  import PastGuesses from "./PastGuesses.svelte";
  import Stats from "./Stats.svelte";

  import { gameState, guessProgress, isDaily, toGuess } from "./util/stores";
  import { addToGuessesSoFar } from "./util/utilities";

  let guesses = 6;

  guessProgress.subscribe((n) => {
    guesses = 6 - n;
    if (guesses == 0) {
      addToGuessesSoFar(
        parseInt($toGuess.siteUrl.slice($toGuess.siteUrl.lastIndexOf("/") + 1))
      );
    }
  });
</script>

<div
  id="game-area"
  style="grid-template-columns: {$gameState == 'idle'
    ? '1fr'
    : '1fr 458px 1fr'}"
>
  <PastGuesses />
  <AnimeCanvas />
  <Hints />
</div>
<p id="guess-info">
  {guesses} Guess{guesses > 1 ? "es" : ""} remaining
</p>
<GuessForm />

{#if !$isDaily}
  <div class="stats-area">
    <Stats />
  </div>
{/if}

<style>
  .stats-area {
    position: absolute;
    bottom: 2em;
    left: 2em;
    z-index: 0;
  }

  #game-area {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1px;
    margin: 0;
    padding: 0;
  }

  p {
    margin: 15px 0 0 0;
    font-size: larger;
    color: white;
  }
</style>
