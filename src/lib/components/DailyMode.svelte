<script lang="ts">
  import { gameMode, isDaily, toGuess } from "../util/stores";
  import { Entry } from "../util/Entry";
  import { onMount } from "svelte";
  import { Gamemode } from "../util/Enums";
  import GameplayElements from "./GameplayElements.svelte";

  onMount(async () => {
    isDaily.set(true);
    gameMode.set(Gamemode.Pixelated);

    await fetch("https://ag-api.timostestdoma.in/daily", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        toGuess.set(new Entry(JSON.parse(atob(data.encoded))));
      })
      .catch((err) => {
        alert(err.message);
      });
  });
</script>

<main class="main-container">
  <GameplayElements />
</main>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
