<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Gamemode } from "./util/Enums";
  import { gameMode } from "./util/stores";
  import { shouldClose } from "./util/utilities";

  const dispatch = createEventDispatcher();

  const handleClose = (e: KeyboardEvent | MouseEvent) => {
    if (shouldClose(e)) {
      dispatch("close");
    }
  };
</script>

<svelte:window on:keydown={handleClose} />

<div class="modal-backdrop" on:click={handleClose} role="none">
  <div class="modal" role="dialog">
    <button class="close-button" on:click={handleClose}>X</button>
    <h2>About</h2>
    <hr />
    This is a game where you have to guess an anime based on {$gameMode ==
    Gamemode.Pixelated
      ? `its pixelated poster, which gets clearer with each failed (or skipped) guess`
      : `(adjustable) cropped sections of the full poster`}. You also unlock
    hints as you play.
    <h3>Important Info</h3>
    <u>Please use the autocomplete feature</u> to search for/enter anime, while
    the comparison isn't case sensitive, it still relies on correct spelling and
    it does <u>not</u> have fuzzy matching.
    <p>
      While the tab is open, the game keeps track of what you've guessed/skipped
      so far, so there shouldn't be any duplicates 👍
    </p>
    <hr />
    Created by <a
      href="https://timostestdoma.in"
      target="_blank"
      rel="noreferrer">Meiyou</a
    >, inspired by
    <a href="https://guessthe.game/" target="_blank" rel="noreferrer"
      >guessthe.game</a
    >
    and
    <a href="https://animedle.io/" target="_blank" rel="noreferrer"
      >animedle.io</a
    >
    <div class="link-icon-container">
      <a
        href="https://github.com/M3IY0U/aniguess"
        target="_blank"
        rel="noreferrer"
        ><img
          src="github-mark-white.svg"
          alt="Project on Github"
          class="link-icon"
        /></a
      >
      <div class="divider" />
      <a href="https://ko-fi.com/meiyou" target="_blank" rel="noreferrer"
        ><img
          src="ko-fi.svg"
          alt="Support me on Ko-Fi"
          class="link-icon"
          style="filter: invert(1);"
        /></a
      >
    </div>
  </div>
</div>

<style>
  h2,
  h3 {
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
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 10px;
    background: #242424;
    z-index: 2;
    box-shadow: 00px 0px 10px #121212;
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
    top: 2%;
    right: 1.5%;
    background-color: #1a1a1a;
    color: white;
  }

  .link-icon {
    height: 35px;
    width: 35px;
    align-self: center;
  }

  .link-icon-container {
    align-content: center;
    justify-content: space-between;
    display: flex;
    width: 85px;
    height: 35px;
    position: fixed;
    top: 2%;
    left: 1.5%;
  }

  .divider {
    align-self: center;
    width: 1px;
    height: 95%;
    background: #fff;
    border-radius: 25%;
    margin: 0 0;
  }
</style>
