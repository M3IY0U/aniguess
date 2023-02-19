<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { onMount } from "svelte";
  import { Stats } from "./util/Stats";
  import { gameState, pastGuesses } from "./util/stores";

  let minimized: boolean =
    JSON.parse(localStorage.getItem("minimized")) ?? false;
  let stats: Stats = new Stats();

  onMount(() => {
    try {
      stats = Object.setPrototypeOf(
        JSON.parse(sessionStorage.getItem("stats")),
        Stats.prototype
      );
    } catch {
      stats = new Stats();
    }
  });

  const toggleStats = () => {
    minimized = !minimized;
    localStorage.setItem("minimized", minimized.toString());
  };

  gameState.subscribe((s) => {
    if (s != "win" && s != "loss") return;

    stats.addRound(s == "win");
    stats = stats;
    sessionStorage.setItem("stats", JSON.stringify(stats));
  });

  pastGuesses.subscribe(() => {
    stats.addGuess();
    stats = stats;
  });

  function resetStats() {
    stats = new Stats();
    sessionStorage.setItem("stats", JSON.stringify(stats));
  }
</script>

{#if !minimized}
  <div transition:scale class="stats-container">
    <div
      class="base-button reset-stats-button"
      on:click={resetStats}
      on:keypress={resetStats}
      title="Reset Stats"
    >
      🔄
    </div>

    <div
      class="base-button minimize-button"
      on:click={toggleStats}
      on:keypress={toggleStats}
      title="Minimize Stats"
    >
      ー
    </div>
    <h2>Stats</h2>
    Correct: {stats.correctRounds}<br />
    Rounds total: {stats.totalRounds}<br />
    Accuracy: {stats.accuracy}% <br />
    Best Streak: {stats.bestStreak} <br />
    Current Streak: {stats.currentStreak} <br />
    Total Guesses: {stats.totalGuesses} <br />
    Average Guesses: {stats.guessAvg} <br />
  </div>
{:else}
  <div
    transition:fade
    class="base-button show-stats-button"
    on:click={toggleStats}
    on:keypress={toggleStats}
    title="Show Stats"
  >
    📊
  </div>
{/if}

<style>
  :root {
    --background-color: #1a1a1a;
    --button-color: #3b3b3b;
    --button-highlight-color: #313131;
  }
  .stats-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--background-color);
    width: 20em;
    height: 13em;
    border-radius: 10px;
    transform-origin: bottom left;
    box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.5);
  }
  h2 {
    margin: 0;
    padding: 0;
  }

  .base-button {
    position: absolute;
    width: 2em;
    height: 2em;
    border-radius: 10px;
    background-color: var(--button-color);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  .reset-stats-button {
    top: 0;
    left: 0;
  }

  .reset-stats-button:hover {
    background-color: var(--button-highlight-color);
  }

  .minimize-button {
    bottom: 0;
    left: 0;
  }

  .minimize-button:hover {
    background-color: var(--button-highlight-color);
  }

  .show-stats-button {
    bottom: 0;
    left: 0;
    width: 3em;
    height: 3em;
    border-radius: 50%;
  }
  .show-stats-button:hover {
    background-color: var(--button-highlight-color);
  }
</style>
