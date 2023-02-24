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
</script>

{#if !minimized}
    <div transition:scale class="stats-container">
        <div
            class="base-button minimize-button"
            on:click={toggleStats}
            on:keypress={toggleStats}
            title="Minimize Stats"
        >
            ー
        </div>
        <h2>Stats</h2>
        <table>
            <tr>
                <td>Correct:</td>
                <td>{stats.correctRounds}</td>
            </tr>

            <tr>
                <td>Rounds total:</td>
                <td>{stats.totalRounds}</td>
            </tr>
            <tr>
                <td>Accuracy (%):</td>
                <td>{stats.accuracy}</td>
            </tr>
            <tr>
                <td>Total Guesses:</td>
                <td>{stats.totalGuesses}</td>
            </tr>
            <tr>
                <td>Average Guesses:</td>
                <td>{stats.guessAvg}</td>
            </tr>
            <tr>
                <td>Best Streak:</td>
                <td>{stats.bestStreak}</td>
            </tr>
            <tr>
                <td>Current Streak:</td>
                <td>{stats.currentStreak}</td>
            </tr>
        </table>
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
        --table-border-color: #666666;
    }
    .stats-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        background-color: var(--background-color);
        width: 17em;
        height: fit-content;
        border-radius: 10px;
        transform-origin: bottom left;
        box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.5);
        padding: 5px 0 10px;
    }
    h2 {
        margin: 0;
        padding: 0;
    }

    table {
        text-align: left;
        border-collapse: collapse;
        border-radius: 5px;
        margin: 5px 0 30px;
        width: 75%;
    }
    tr:not(tr:first-child) {
        border-top: 1px solid var(--table-border-color);
    }
    tr td {
        padding: 2px 10px;
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
