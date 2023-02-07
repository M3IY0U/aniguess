<script lang="ts">
  import GuessForm from "./lib/GuessForm.svelte";
  import PlayField from "./lib/PlayField.svelte";
  import data from "./assets/data.json";
  import { entries, guessProgress, toGuess } from "./lib/util/stores";
  import { Entry } from "./lib/util/Entry";
  
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
  <div class="current-guess">
    <PlayField />
    <p id="guess-info" class="guesses">{guesses} Guesses remaining</p>
    <GuessForm />
  </div>
</main>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .current-guess {
    display: flex;
    flex-direction: column;
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
  }

  /* button {
    width: 50px;
    height: 50px;
    border-radius: 15px;
  } */
</style>
