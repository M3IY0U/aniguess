<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { userEntries } from "./util/stores";
  import { flashEmoji, getMediaListFromAnilist, shouldClose } from "./util/utilities";

  const dispatch = createEventDispatcher();
  let name: string = localStorage.getItem("anilist-name") || "";

  const handleClose = (e: KeyboardEvent | MouseEvent) => {
    if (shouldClose(e)) {
      dispatch("close");
    }
  };

  const setHandler = async () => {
    getMediaListFromAnilist(name).then((data) => {
      console.log(data);
      
      userEntries.set(data);
      localStorage.setItem("anilist-name", name);
      flashEmoji("✅");
    });
  };
</script>

<svelte:window on:keydown={handleClose} />

<div class="modal-backdrop" on:click={handleClose} role="none">
  <div class="modal" role="dialog">
    <button class="close-button" on:click={handleClose}>X</button>
    <h2>Settings</h2>
    <div class="settings-content">
      <label for="anilist-name">Filter to user anilist</label>
      <input type="text" name="anilist-name" id="anilist-name" placeholder="Username" bind:value={name}>
      <button class="set-button" on:click={setHandler} >Set</button>
      <br />
      <label for="movie-toggle">Enable Movies</label>
      <input
        type="checkbox"
        name="Movies"
        id="movie-toggle"
        value="Movie Checkbox"
      />
    </div>
  </div>
</div>

<style>
  .set-button {
    border-radius: 10px;
  }

  .settings-content {
    float: left;
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
