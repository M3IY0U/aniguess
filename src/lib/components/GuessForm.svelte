<script lang="ts">
  import { onMount } from "svelte";
  import Countdown from "./Countdown.svelte";
  import { Guess, GuessType } from "../util/Guess";
  import { gameState, guessProgress, isDaily, pastGuesses, toGuess } from "../util/stores";
  import { flashEmoji, setGuessInfoText } from "../util/utilities";
  import { browser } from "$app/environment";

  let guessText = "";
  let allEntries: any[] = [];

  function startGame() {
    if ($gameState == "running") return;
    gameState.set("running");
  }

  function endGame(result: boolean) {
    if (!browser) return;
    if (result) {
      gameState.set("win");
      setGuessInfoText($toGuess!.siteUrl);
      flashEmoji("🎉");
    } else {
      gameState.set("loss");
      setGuessInfoText($toGuess!.siteUrl, $toGuess!.title.english);
      flashEmoji("💀");
    }

    document.querySelector("canvas")!.classList.add(result ? "success" : "failure");

    if ($isDaily) {
      let today = new Date();
      localStorage.setItem(
        `${today.getUTCDate()}-${today.getUTCMonth() + 1}-${today.getUTCFullYear()}`,
        `${result}`
      );
      localStorage.setItem(`daily-guesses`, JSON.stringify($pastGuesses));
    }
  }

  function submitClick() {
    if (
      guessText.toLowerCase() == $toGuess!.title.english.toLowerCase() ||
      guessText.toLowerCase() == $toGuess!.title.romaji.toLowerCase()
    ) {
      pastGuesses.update((arr) => [...arr, new Guess(GuessType.Success, guessText)]);
      while ($guessProgress < 6) {
        guessProgress.update((n) => n + 1);
      }

      endGame(true);
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
        endGame(false);
      }
    }
  }

  const skipClick = () => {
    pastGuesses.update((arr) => [...arr, new Guess(GuessType.Skip)]);
    guessProgress.update(function (n) {
      return Math.min(n + 1, 6);
    });
    if ($guessProgress == 6) {
      endGame(false);
    }
  };

  toGuess.subscribe(async (e) => {
    if (!e) return;
    if (!$isDaily) return;

    let today = new Date();
    let alreadyPlayed = localStorage.getItem(
      `${today.getUTCDate()}-${today.getUTCMonth() + 1}-${today.getUTCFullYear()}`
    );
    if (alreadyPlayed) {
      $pastGuesses = JSON.parse(localStorage.getItem("daily-guesses")! || "[]");
      endGame(JSON.parse(alreadyPlayed));

      for (let i = 0; i < 6; i++) {
        guessProgress.set(i + 1);
      }
    }
  });

  onMount(async () => {
    if (localStorage.getItem("autocomplete-entries") == null) {
      const response = await fetch("https://ag-api.timostestdoma.in/autocomplete", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      localStorage.setItem("autocomplete-entries", JSON.stringify(data));
      allEntries = data;
    } else {
      allEntries = JSON.parse(localStorage.getItem("autocomplete-entries")! || "[]");
    }
  });

  function shareResult(): any {
    let text = `AniGuess Daily ${new Date().toLocaleDateString()}\n`;

    let maxLength = Math.max(...$pastGuesses.map((guess) => guess.text.length)) - 2;
    console.log(maxLength);

    $pastGuesses.forEach((guess, i) => {
      switch (guess.type) {
        case GuessType.Success:
          text += `\`#${i + 1}\` ||\`${guess.text
            .substring(0, guess.text.length - 2)
            .padEnd(maxLength)}\`|| ✅\n`;
          break;
        case GuessType.Failure:
          text += `\`#${i + 1}\` ||\`${guess.text
            .substring(0, guess.text.length - 2)
            .padEnd(maxLength)}\`|| ❌\n`;
          break;
        case GuessType.Skip:
          text += `\`#${i + 1}\` Skipped ⏭️\n`;
          break;
      }
    });

    text += "\n<https://aniguess.moe/daily>";
    navigator.clipboard.writeText(text);
  }
</script>

<div class="guess-input-container">
  {#if ($gameState == "win" || $gameState == "loss") && $isDaily}
    <Countdown />
  {:else}
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
  {/if}
  <div class="action-buttons">
    {#if $gameState == "win" || $gameState == "loss"}
      {#if $isDaily}
        <button id="share-button" on:click={() => shareResult()}>Share</button>
      {:else}
        <button id="retry-button" on:click={() => window.location.reload()}>Retry</button>
      {/if}
    {:else}
      <button class="submit-button" on:click|once={startGame} on:click={submitClick}>Submit</button>
      <button class="skip-button" on:click|once={startGame} on:click={skipClick}>Skip ⏩</button>
    {/if}
  </div>
</div>

<style>
  #retry-button,
  #share-button {
    width: 170px;
  }
  .guess-input-container {
    width: 450px;
    margin-top: 15px;
    flex-direction: row;
    display: flex;
    align-items: center;
    align-self: center;
    justify-content: space-between;
  }

  .action-buttons {
    float: right;
  }

  input {
    font-family: Quicksand;
    float: left;
    height: 50px;
    border-radius: 10px;
    border: 2px solid #2b2b2b;
    padding: 0 10px;
    font-size: 1.2rem;
    outline: none;
    width: 50%;
    background-color: #3b3b3b;
    color: white;
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
    background-color: #2c2c2c;
    cursor: not-allowed;
  }
</style>
