<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import { Gamemode } from "../util/Enums";
  import { enabledFormats, gameMode, isDaily, userEntries } from "../util/stores";
  import { flashEmoji, getMediaListFromAnilist, shouldClose } from "../util/utilities";

  const dispatch = createEventDispatcher();
  let name: string = localStorage.getItem("anilist-name") || "";
  let ona: boolean, movie: boolean, tv: boolean;
  let gm: Gamemode = $gameMode;
  let cropSize = parseInt(localStorage.getItem("crop-size") || "80");
  $: gameMode.set(gm);

  const handleClose = (e: KeyboardEvent | MouseEvent) => {
    if (shouldClose(e)) {
      dispatch("close");
    }
  };

  const setHandler = async () => {
    if (name == "") return;

    getMediaListFromAnilist(name).then((data) => {
      userEntries.set(data);
      localStorage.setItem("anilist-name", name);
      localStorage.setItem("user-entries", JSON.stringify(data));
      flashEmoji("✅");
    });
  };

  const clearHandler = () => {
    localStorage.removeItem("user-entries");
    localStorage.removeItem("anilist-name");
    name = "";
    flashEmoji("✅");
  };

  onMount(() => {
    $enabledFormats.forEach((format) => {
      switch (format) {
        case "TV":
          tv = true;
          break;
        case "MOVIE":
          movie = true;
          break;
        case "ONA":
          ona = true;
          break;
      }
    });
  });

  function handleSetting(e: any) {
    // update enabledFormats
    if (e.target.checked) {
      enabledFormats.update((arr) => {
        arr.push(e.target.name);
        return arr;
      });
    } else {
      enabledFormats.update((arr) => {
        return arr.filter((format) => format != e.target.name);
      });
    }
    // keep at least one box checked
    if ($enabledFormats.length == 0) {
      e.target.checked = true;
      enabledFormats.update((arr) => {
        arr.push(e.target.name);
        return arr;
      });
    }
  }

  function resetProgress() {
    sessionStorage.removeItem("guesses-so-far");
    sessionStorage.removeItem("stats");
    flashEmoji("✅");
    location.reload();
  }
</script>

<svelte:window on:keydown={handleClose} />

<div class="modal-backdrop" on:click={handleClose} role="none">
  <div class="modal" role="dialog">
    <button class="close-button" on:click={handleClose}>X</button>
    <h2>Settings</h2>
    {#if $isDaily}
      Settings are disabled in Daily mode.
    {:else}
      <div class="settings-content">
        <section class="gamemode-settings">
          <fieldset class="gamemode-section">
            <legend>Gamemode</legend>
            <div class="gamemode-selection">
              <input
                type="radio"
                name="gamemode"
                value={Gamemode.Pixelated}
                id="gamemode-pixelated"
                bind:group={gm}
              />
              <label for="gamemode-pixelated">Pixelated</label>
            </div>
            <div class="gamemode-selection">
              <input
                type="radio"
                name="gamemode"
                value={Gamemode.Cropped}
                id="gamemode-cropped"
                bind:group={gm}
              />
              <label for="gamemode-pixelated">Cropped</label>
            </div>
          </fieldset>
          {#if gm == Gamemode.Cropped}
            <div style="align-self: flex-end;width: 12em;">
              <label for="cropsize-slider">Crop Size {cropSize}</label>
              <input
                type="range"
                min="10"
                max="110"
                name="Crop Size Slider"
                bind:value={cropSize}
                on:change={() => localStorage.setItem("crop-size", cropSize.toString())}
                id="cropsize-slider"
              />
            </div>
          {/if}
        </section>
        <hr />
        <section class="checkboxes">
          <div class="checkbox-setting">
            <input
              type="checkbox"
              name="TV"
              id="tv-toggle"
              value="TV Checkbox"
              on:change={(e) => handleSetting(e)}
              bind:checked={tv}
            />
            <label for="tv-toggle">Enable TV Shows</label>
          </div>
          <div class="checkbox-setting">
            <input
              type="checkbox"
              name="MOVIE"
              id="movie-toggle"
              value="Movie Checkbox"
              on:change={(e) => handleSetting(e)}
              bind:checked={movie}
            />
            <label for="movie-toggle">Enable Movies</label>
          </div>
          <div class="checkbox-setting">
            <input
              type="checkbox"
              name="ONA"
              id="ona-toggle"
              value="ONA Checkbox"
              on:change={(e) => handleSetting(e)}
              bind:checked={ona}
            />
            <label for="ona-toggle">Enable ONAs</label>
          </div>
        </section>
        <hr />
        <section>
          <form on:submit|preventDefault={setHandler}>
            <div class="username-input">
              <input
                type="text"
                name="anilist-name"
                id="anilist-name"
                placeholder="Username"
                bind:value={name}
              />
              <label for="anilist-name">Filter to user anilist</label>
            </div>
            <button class="set-button" on:click={setHandler}>Set</button>
            <button class="clear-button" on:click={clearHandler}>Clear</button>
          </form>
        </section>
        <section class="settings-meta">
          <button class="base-button reset-button" on:click={resetProgress}
            >Reset guesses so far</button
          >
          <button class="base-button apply-button" on:click={() => location.reload()}
            >Apply (Reload)</button
          >
        </section>
      </div>
    {/if}
  </div>
</div>

<style>
  .gamemode-settings {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid #808080;
    border-radius: 10px;
  }
  .gamemode-section {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: none;
  }

  .settings-meta {
    margin-top: 10px;
  }
  .username-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 5px 0;
  }
  label {
    align-self: center;
    margin-left: 5px;
  }
  input {
    font-family: Quicksand;
    float: left;
    height: 30px;
    border-radius: 10px;
    border: 2px solid #2b2b2b;
    padding: 0 10px;
    outline: none;
    width: 25%;
    background-color: #3b3b3b;
    align-self: center;
    justify-self: center;
    vertical-align: middle;
    color: white;
  }

  .base-button {
    border-radius: 10px;
    padding: 5px;
    margin-top: 1em;
    color: white;
    background-color: #1a1a1a;
  }

  .reset-button {
    float: left;
  }

  .apply-button {
    float: right;
  }
  .checkbox-setting {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0.5em 0;
  }
  .checkboxes input[type="checkbox"],
  input[type="radio"] {
    width: 1.5em;
    height: 1.5em;
  }
  .checkboxes {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .set-button,
  .clear-button {
    border-radius: 10px;
    background-color: #1a1a1a;
    color: white;
  }

  .settings-content {
    text-align: left;
  }
  h2 {
    margin: 0;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 40%;
    width: calc(100vw - 4em);
    max-width: 32em;
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 10px;
    background: #242424;
    z-index: 2;
    box-shadow: 00px 0px 10px #121212;
    display: flex;
    flex-direction: column;
    color: white;
  }

  .close-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 10px;
    position: fixed;
    top: 2.5%;
    right: 1.5%;
    background-color: #1a1a1a;
    color: white;
  }
</style>
