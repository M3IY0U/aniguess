<script lang="ts">
  import GuessForm from "./lib/GuessForm.svelte";
  import {
    enabledFormats,
    gameState,
    guessProgress,
    toGuess,
  } from "./lib/util/stores";
  import { Entry } from "./lib/util/Entry";
  import Hints from "./lib/Hints.svelte";
  import PastGuesses from "./lib/PastGuesses.svelte";
  import AnimeCanvas from "./lib/AnimeCanvas.svelte";
  import { addToGuessesSoFar } from "./lib/util/utilities";
  import AboutModal from "./lib/AboutModal.svelte";
  import SettingsModal from "./lib/SettingsModal.svelte";
  import { onMount } from "svelte";
  import Stats from "./lib/Stats.svelte";

  let aboutModal = false;
  let settingsModal = false;

  let gsf = JSON.parse(sessionStorage.getItem("guesses-so-far")) || [];

  enabledFormats.subscribe((arr) => {
    if (arr.length == 0) return;
    localStorage.setItem("enabled-formats", JSON.stringify(arr));
  });

  onMount(async () => {
    if (localStorage.getItem("enabled-formats") == null) {
      enabledFormats.set(["TV", "MOVIE", "ONA"]);
      localStorage.setItem("enabled-formats", JSON.stringify($enabledFormats));
    } else {
      enabledFormats.set(JSON.parse(localStorage.getItem("enabled-formats")));
    }
    await fetch("https://ag-api.timostestdoma.in/entries", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        alreadyGuessed: gsf,
        enabledFormats: $enabledFormats,
        userEntries: JSON.parse(localStorage.getItem("user-entries")) || [],
      }),
    })
      .then((res) => {
        if (res.status == 204) {
          throw new Error(
            `
You've run out of stuff to guess. That means: 
1. Either you're very dedicated and guessed over 1000 things
2. You've guessed everything the server can give you with the filters
   you've set. You can toggle them or reset your progress in the settings.
            `
          );
        }
        return res.json();
      })
      .then((data) => {
        toGuess.set(new Entry(data));
      })
      .catch((err) => {
        alert(err.message);
      });
  });

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

<header class="header">
  <h1>AniGuess</h1>
  <div class="meta-buttons">
    <button class="button-about" on:click={() => (aboutModal = true)}>
      <img src="info.svg" width="35" height="35" alt="" />
    </button>
    <button class="button-settings" on:click={() => (settingsModal = true)}>
      <img src="settings.svg" width="35" height="35" alt="" />
    </button>
  </div>
</header>

{#if aboutModal}
  <AboutModal on:close={() => (aboutModal = false)} />
{/if}

{#if settingsModal}
  <SettingsModal on:close={() => (settingsModal = false)} />
{/if}

<main class="main-container">
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
  <div class="stats-area">
    <Stats />
  </div>
</main>

<style>
  .stats-area {
    position: absolute;
    bottom: 2em;
    left: 2em;
    z-index: 0;
  }
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
    margin: 15px 0 0 0;
    font-size: larger;
    color: white;
  }

  .header {
    width: 450px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin: 0 0;
    padding: 0 0;
  }

  h1 {
    align-self: center;
    color: white;
  }

  .meta-buttons {
    width: 110px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }

  .meta-buttons button {
    align-self: center;
    justify-content: center;
    display: flex;
    width: 50px;
    height: 50px;
    border-radius: 15px;
    background-color: #1a1a1a;
    color: white;
  }

  .button-about img {
    align-self: center;
    filter: invert() opacity(0.75);
  }

  .button-settings img {
    align-self: center;
    filter: invert() opacity(0.75);
  }
</style>
