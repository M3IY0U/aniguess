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
    <button class="close-button" on:click={handleClose}>X</button>
    <h2>Settings</h2>
    <img
      src="https://cdn.discordapp.com/attachments/493557274371948545/1073315991322378381/wao.gif"
      width="200"
      height="200"
      alt="Okuu"
    />
    <br />Coming soon™
  </div>
</div>

<style>
  h2 {
    margin: 10px 0 0 0;
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
    background: #555555;
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
