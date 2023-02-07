<script lang="ts">
  import { entries, guessProgress, toGuess } from "./util/stores";

  let guess = "";

  const skipClick = () => {
    guessProgress.update(function (n) {
      return Math.min(n + 1, 6);
    });
    if ($guessProgress == 6) {
      lose();
    }
  };

  const enableHints = () => {
    document.getElementById("hint-container").setAttribute("style", "");
  };

  function submitClick() {
    if (
      guess.toLowerCase() == $toGuess.title.english.toLowerCase() ||
      guess.toLowerCase() == $toGuess.title.romaji.toLowerCase()
    ) {
      win();
    } else {
      enableHints();
      guessProgress.update(function (n) {
        return Math.min(n + 1, 6);
      });
      guess = "";
      if ($guessProgress == 6) {
        lose();
      }
    }
  }

  function lose() {
    document.getElementById("anime-image").classList.add("failure");

    document.getElementById(
      "guess-info"
    ).innerHTML = `You lose, the correct answer was: <a target="_blank" href="${$toGuess.siteUrl}">${$toGuess.title.english}</a>`;
    gameEnd();
  }

  function win() {
    while ($guessProgress < 6) {
      guessProgress.update((n) => n + 1);
    }
    document.getElementById("anime-image").classList.add("success");
    document.getElementById(
      "guess-info"
    ).innerHTML = `Correct! Here it is <a target="_blank" href="${$toGuess.siteUrl}">on Anilist</a>`;
    gameEnd();
  }

  function gameEnd() {
    [...document.getElementsByClassName("action-buttons")[0].children].forEach(
      (button) => {
        button.setAttribute("disabled", "");
      }
    );

    // increse font size of guess info
    document
      .getElementById("guess-info")
      .setAttribute("style", "font-size: 3em");
  }
</script>

<div class="guess-input-container">
  <form on:submit|preventDefault={submitClick}>
    <input
      type="text"
      placeholder="Search for an anime"
      list="suggestions"
      bind:value={guess}
      on:submit={submitClick}
    />
  </form>
  <datalist id="suggestions">
    {#each $entries as entry}
      <option value={entry.title.english} />
      {#if entry.title.romaji != entry.title.english}
        <option value={entry.title.romaji} />
      {/if}
    {/each}
  </datalist>
  <div class="action-buttons">
    <button class="submit-button" on:click={submitClick}>Submit</button>
    <button class="skip-button" on:click|once={enableHints} on:click={skipClick}
      >Skip ⏩</button
    >
  </div>
</div>

<style>
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
</style>
