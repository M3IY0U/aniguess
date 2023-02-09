<script lang="ts">
  import { createEventDispatcher } from "svelte";
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
    <h2>Settings</h2>
    settings go here
    <button on:click={handleClose}>Close</button>
  </div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 0;
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 20%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 0.2em;
    background: darkgray;
    z-index: 1;
  }

  button {
    display: block;
  }
</style>
