<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

  const handle_keydown = e => {
		if (e.key === 'Escape') {
			close();
			return;}
		}
</script>

<svelte:window on:keydown={handle_keydown}/>

  <div class="modal-backdrop">
    <div class="modal" role="dialog">
      <h2>About</h2>
      hello this is a placeholder until i actually put something here
      <button on:click={close}>Close</button>
    </div>
  </div>

  <style>
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.3);
    }
  
    .modal {
      position: absolute;
      left: 50%;
      top: 20%;
      width: calc(100vw - 4em);
      max-width: 32em;
      max-height: calc(100vh - 4em);
      overflow: auto;
      transform: translate(-50%,-50%);
      padding: 1em;
      border-radius: 0.2em;
      background: darkgray
    }
  
    button {
      display: block;
    }
  </style>