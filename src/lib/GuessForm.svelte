<script lang="ts">
  import {
    entries,
    gameState,
    guessProgress,
    pastGuesses,
    toGuess,
  } from "./util/stores";
  import { setGuessInfoText } from "./util/utilities";

  let guess = "";

  function startGame() {
    if ($gameState == "running") return;
    gameState.set("running");
  }

  function submitClick() {
    if (
      guess.toLowerCase() == $toGuess.title.english.toLowerCase() ||
      guess.toLowerCase() == $toGuess.title.romaji.toLowerCase()
    ) {
      pastGuesses.update((arr) => [...arr, `${guess} ✅`]);
      while ($guessProgress < 6) {
        guessProgress.update((n) => n + 1);
      }

      gameState.set("win");
      setGuessInfoText($toGuess.siteUrl);
    } else {
      guessProgress.update(function (n) {
        return Math.min(n + 1, 6);
      });
      guess = guess.trim() == "" ? "Skipped ⏩" : `${guess} ❌`;

      pastGuesses.update((arr) => [...arr, guess]);

      guess = "";
      if ($guessProgress == 6) {
        gameState.set("loss");
        setGuessInfoText($toGuess.siteUrl, $toGuess.title.english);
      }
    }
  }

  const skipClick = () => {
    pastGuesses.update((arr) => [...arr, "Skipped ⏩"]);
    guessProgress.update(function (n) {
      return Math.min(n + 1, 6);
    });
    if ($guessProgress == 6) {
      gameState.set("loss");
      setGuessInfoText($toGuess.siteUrl, $toGuess.title.english);
    }
  };
</script>

<div class="guess-input-container">
  <!-- svelte-ignore a11y-autofocus -->
  <input
    id="guess-input"
    type="text"
    autofocus
    placeholder="Search for an anime"
    list="suggestions"
    bind:value={guess}
    on:keydown={(e) => {
      if (e.key == "Enter") {
        submitClick();
        if ($gameState == "idle") startGame();
      }
    }}
    disabled={$gameState == "win" || $gameState == "loss"}
  />
  <datalist id="suggestions">
    {#each $entries as entry}
      <option value={entry.title.english} />
      {#if entry.title.romaji != entry.title.english}
        <option value={entry.title.romaji} />
      {/if}
    {/each}
  </datalist>
  <div class="action-buttons">
    {#if $gameState == "win" || $gameState == "loss"}
      <button id="retry-button" on:click={() => window.location.reload()}>Retry</button>
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
  }

  button {
    height: 50px;
    border-radius: 15px;
    padding: 0 15px;
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
