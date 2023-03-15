<script lang="ts">
  import AboutModal from "../lib/components/AboutModal.svelte";
  import SettingsModal from "../lib/components/SettingsModal.svelte";
  import { inject } from "@vercel/analytics";
  import InfiniteMode from "../lib/components/InfiniteMode.svelte";
  import DailyMode from "../lib/components/DailyMode.svelte";
  import { gameMode, isDaily } from "../lib/util/stores";
  import { browser } from "$app/environment";

  if (browser && sessionStorage.getItem("analytics") == null) {
    sessionStorage.setItem("analytics", "");
    try {
      inject();
    } catch {
      // ignored
    }
  }

  gameMode.subscribe((gm) => {
    if (gm == null) return;
    localStorage.setItem("gamemode", gm);
  });

  let aboutModal = false;
  let settingsModal = false;
</script>

{#if aboutModal}
  <AboutModal on:close={() => (aboutModal = false)} />
{/if}

{#if settingsModal}
  <SettingsModal on:close={() => (settingsModal = false)} />
{/if}

<header class="header">
  <h1>{$isDaily ? "📅" : "♾️"} AniGuess</h1>
  <div class="meta-buttons">
    <button class="button-about" on:click={() => (aboutModal = true)}>
      <img src="info.svg" width="35" height="35" alt="" />
    </button>
    <button class="button-settings" on:click={() => (settingsModal = true)}>
      <img src="settings.svg" width="35" height="35" alt="" />
    </button>
  </div>
</header>
<InfiniteMode />

<style>
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
