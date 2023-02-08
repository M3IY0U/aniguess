<script lang="ts">
  import GuessForm from "./lib/GuessForm.svelte";
  import data from "./assets/data.json";
  import { entries, gameState, guessProgress, toGuess } from "./lib/util/stores";
  import { Entry } from "./lib/util/Entry";
  import Hints from "./lib/Hints.svelte";
  import PastGuesses from "./lib/PastGuesses.svelte";
  import AnimeCanvas from "./lib/AnimeCanvas.svelte";

  entries.set(data.map((e) => new Entry(e)));
  toGuess.set($entries[Math.floor(Math.random() * $entries.length)]);

  let guesses = 6;

  guessProgress.subscribe((n) => {
    guesses = 6 - n;
  });
</script>

<header class="header">
  <h1>AniGuess</h1>
  <!-- <div class="meta-buttons">
    <button class="button-about" />
    <button class="button-help" />
  </div> -->
</header>

<main class="main-container">
  <div id="game-area" style="grid-template-columns: {$gameState == 'idle' ? '1fr' : '1fr 458px 1fr'}">
    <PastGuesses />
    <AnimeCanvas />
    <Hints />
  </div>
  <p id="guess-info" class="guesses">{guesses} Guess{guesses > 1 ? "es" : ""} remaining</p>
  <GuessForm />
</main>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #game-area {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1px;
    margin: 0;
    padding: 0;
  }

  p {
    margin: 15px 0 0 5px;
    font-size: larger;
  }

  .header {
    display: flex;
    flex-direction: row;
    width: 50vw;
    justify-content: center;
    align-items: center;
    margin: 0 0;
    padding: 0 0;
    font-size: small;
  }

  /* button {
    width: 50px;
    height: 50px;
    border-radius: 15px;
  } */
</style>
