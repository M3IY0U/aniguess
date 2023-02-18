<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import { enabledFormats, userEntries } from "./util/stores";
  import {
    flashEmoji,
    getMediaListFromAnilist,
    shouldClose,
  } from "./util/utilities";

  const dispatch = createEventDispatcher();
  let name: string = localStorage.getItem("anilist-name") || "";
  let ona: boolean, movie: boolean, tv: boolean;

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
    flashEmoji("✅");
  }
</script>

<svelte:window on:keydown={handleClose} />

<div class="modal-backdrop" on:click={handleClose} role="none">
  <div class="modal" role="dialog">
    <button class="close-button" on:click={handleClose}>X</button>
    <h2>Settings</h2>
    <div class="settings-content">
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
        <button class="reset-button" on:click={resetProgress}
          >Reset Progress</button
        >
        <button class="apply-button" on:click={() => location.reload()}
          >Apply (Reload)</button
        >
      </section>
    </div>
  </div>
</div>

<style>
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
  }

  .reset-button {
    margin-top: 1em;
    float: left;
    border-radius: 10px;
    padding: 5px;
  }

  .apply-button {
    margin-top: 1em;
    float: right;
    border-radius: 10px;
    padding: 5px;
  }
  .checkbox-setting {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0.5em 0;
  }
  .checkboxes input[type="checkbox"] {
    width: 1.5em;
    height: 1.5em;
    margin: 0;
  }
  .checkboxes {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .set-button,
  .clear-button {
    border-radius: 10px;
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
    z-index: 0;
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 40%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 10px;
    background: #242424;
    z-index: 1;
    box-shadow: 00px 0px 10px #121212;
    display: flex;
    flex-direction: column;
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
  }
</style>
