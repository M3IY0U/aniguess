<script lang="ts">
  import { onMount } from "svelte";

  let timeUntil: number;
  let display: string;

  onMount(async () => {
    await fetch("https://ag-api.timostestdoma.in/timeuntil", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        timeUntil = data.timeUntil;
        setDisplay(timeUntil - Date.now());
      });
  });

  function setDisplay(distance: number) {
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    display = hours + "h " + minutes + "m " + seconds + "s ";
  }

  let x = setInterval(() => {
    let distance = timeUntil - Date.now();

    setDisplay(distance);

    if (distance < 0) {
      clearInterval(x);
      window.location.reload();
    }
  }, 1000);
</script>

<div class="countdown">
  Next Daily in {display}
</div>

<style>
  .countdown {
    font-size: 20px;
    width: fit-content;
    color: white;
    text-align: center;
    float: left;
  }
</style>
