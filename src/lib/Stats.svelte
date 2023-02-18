<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { onMount } from "svelte";
  import { Stats } from "./util/Stats";
  import { gameState } from "./util/stores";

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

    if (s == "win") {
      stats.add(true);
    } else if (s == "loss") {
      stats.add(false);
    }
    stats = stats;
    sessionStorage.setItem("stats", JSON.stringify(stats));
  });

  function resetStats() {
    stats = new Stats();
    sessionStorage.setItem("stats", JSON.stringify(stats));
  }
</script>

{#if !minimized}
  <div transition:scale class="stats-container">
    <div
      class="reset-stats-button"
      on:click={resetStats}
      on:keypress={resetStats}
      title="Reset Stats"
    >
      🔄
    </div>

    <div
      class="minimize-button"
      on:click={toggleStats}
      on:keypress={toggleStats}
      title="Minimize Stats"
    >
      ー
    </div>
    <h2>Stats</h2>
    Correct: {stats.correctRounds}<br />
    Rounds total: {stats.totalRounds}<br />
    Accuracy: {stats.accuracy.toFixed(2)}% <br />
    Best Streak {stats.bestStreak} <br />
    Current Streak {stats.currentStreak}
  </div>
{:else}
  <div
    transition:fade
    class="show-stats-button"
    on:click={toggleStats}
    on:keypress={toggleStats}
    title="Show Stats"
  >
    📊
  </div>
{/if}

<style>
  .stats-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #1a1a1a;
    width: 20em;
    height: 10em;
    border-radius: 10px;
    transform-origin: bottom left;
  }
  h2 {
    margin: 0;
    padding: 0;
  }

  .reset-stats-button {
    position: absolute;
    top: 0;
    left: 0;
    width: 2em;
    height: 2em;
    border-radius: 10px;
    background-color: #3b3b3b;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  .reset-stats-button:hover {
    background-color: #313131;
  }

  .minimize-button {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 2em;
    height: 2em;
    border-radius: 10px;
    background-color: #3b3b3b;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  .minimize-button:hover {
    background-color: #313131;
  }

  .show-stats-button {
    position: absolute;
    font-weight: bolder;
    bottom: 0;
    left: 0;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    background-color: #3b3b3b;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }
  .show-stats-button:hover {
    background-color: #313131;
  }
</style>
