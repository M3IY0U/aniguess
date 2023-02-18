<script lang="ts">
  import { onMount } from "svelte";
  import { Guess, GuessType } from "./util/Guess";
  import {
    gameState,
    guessProgress,
    pastGuesses,
    toGuess,
  } from "./util/stores";
  import { setGuessInfoText } from "./util/utilities";

  let guessText = "";
  let allEntries = [];

  function startGame() {
    if ($gameState == "running") return;
    gameState.set("running");
  }

  function submitClick() {
    if (
      guessText.toLowerCase() == $toGuess.title.english.toLowerCase() ||
      guessText.toLowerCase() == $toGuess.title.romaji.toLowerCase()
    ) {
      pastGuesses.update((arr) => [
        ...arr,
        new Guess(GuessType.Success, guessText),
      ]);
      while ($guessProgress < 6) {
        guessProgress.update((n) => n + 1);
      }

      gameState.set("win");
      setGuessInfoText($toGuess.siteUrl);
    } else {
      guessProgress.update(function (n) {
        return Math.min(n + 1, 6);
      });

      let guess: Guess;
      if (guessText.trim() == "") {
        guess = new Guess(GuessType.Skip);
      } else {
        guess = new Guess(GuessType.Failure, guessText);
      }

      pastGuesses.update((arr) => [...arr, guess]);

      guessText = "";
      if ($guessProgress == 6) {
        gameState.set("loss");
        setGuessInfoText($toGuess.siteUrl, $toGuess.title.english);
      }
    }
  }

  const skipClick = () => {
    pastGuesses.update((arr) => [...arr, new Guess(GuessType.Skip)]);
    guessProgress.update(function (n) {
      return Math.min(n + 1, 6);
    });
    if ($guessProgress == 6) {
      gameState.set("loss");
      setGuessInfoText($toGuess.siteUrl, $toGuess.title.english);
    }
  };

  onMount(async () => {
    if (localStorage.getItem("autocomplete-entries") == null) {
      const response = await fetch(
        "https://ag-api.timostestdoma.in/autocomplete",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      localStorage.setItem("autocomplete-entries", JSON.stringify(data));
      allEntries = data;
    } else {
      allEntries = JSON.parse(localStorage.getItem("autocomplete-entries"));
    }
  });
</script>

<div class="guess-input-container">
  <!-- svelte-ignore a11y-autofocus -->
  <input
    id="guess-input"
    type="text"
    autofocus
    placeholder="Search for an anime"
    list="suggestions"
    bind:value={guessText}
    on:keydown={(e) => {
      if (e.key == "Enter") {
        submitClick();
        if ($gameState == "idle") startGame();
      }
    }}
    disabled={$gameState == "win" || $gameState == "loss"}
  />
  <datalist id="suggestions">
    {#each allEntries as entry}
      <option value={entry.title_e} />
      {#if entry.title_r.toLowerCase() != entry.title_e.toLowerCase()}
        <option value={entry.title_r} />
      {/if}
    {/each}
  </datalist>
  <div class="action-buttons">
    {#if $gameState == "win" || $gameState == "loss"}
      <button id="retry-button" on:click={() => window.location.reload()}
        >Retry</button
      >
    {:else}
      <button
        class="submit-button"
        on:click|once={startGame}
        on:click={submitClick}>Submit</button
      >
      <button class="skip-button" on:click|once={startGame} on:click={skipClick}
        >Skip ⏩</button
      >
    {/if}
  </div>
</div>

<style>
  #retry-button {
    width: 170px;
  }
  .guess-input-container {
    width: 450px;
    margin-top: 15px;
    flex-direction: row;
    align-items: center;
    align-self: center;
    justify-content: space-between;
  }

  .action-buttons {
    float: right;
  }

  input {
    float: left;
    height: 50px;
    border-radius: 10px;
    border: 2px solid #2b2b2b;
    padding: 0 10px;
    font-size: 1.2rem;
    outline: none;
    width: 50%;
    background-color: #3b3b3b;
  }

  button {
    height: 50px;
    border-radius: 15px;
    padding: 0 15px;
    background-color: #1a1a1a;
    color: white;
  }

  button:disabled {
    border: 2px solid #2b2b2b;
    cursor: not-allowed;
  }

  #guess-input:disabled {
    border: 2px solid #2b2b2b;
    cursor: not-allowed;
  }
</style>
