<script lang="ts">
  import { enabledFormats, gameMode, isDaily, toGuess } from "./util/stores";
  import { Entry } from "./util/Entry";
  import { onMount } from "svelte";
  import { Gamemode } from "./util/Enums";
  import GameplayElements from "./GameplayElements.svelte";

  enabledFormats.subscribe((arr) => {
    if (arr.length == 0) return;
    localStorage.setItem("enabled-formats", JSON.stringify(arr));
  });

  onMount(async () => {
    isDaily.set(false);

    if (localStorage.getItem("gamemode") == null) {
      localStorage.setItem("gamemode", Gamemode.Pixelated);
      gameMode.set(Gamemode.Pixelated);
    } else {
      gameMode.set(localStorage.getItem("gamemode") as Gamemode);
    }

    if (localStorage.getItem("crop-size") == null) {
      localStorage.setItem("crop-size", "100");
    }

    if (localStorage.getItem("enabled-formats") == null) {
      enabledFormats.set(["TV", "MOVIE", "ONA"]);
      localStorage.setItem("enabled-formats", JSON.stringify($enabledFormats));
    } else {
      enabledFormats.set(JSON.parse(localStorage.getItem("enabled-formats")));
    }
    await fetch("https://ag-api.timostestdoma.in/entries", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        alreadyGuessed:
          JSON.parse(sessionStorage.getItem("guesses-so-far")) || [],
        enabledFormats: $enabledFormats,
        userEntries: JSON.parse(localStorage.getItem("user-entries")) || [],
      }),
    })
      .then((res) => {
        if (res.status == 204) {
          throw new Error(
            `
You've run out of stuff to guess. That means: 
1. Either you're very dedicated and guessed over 1000 things
2. You've guessed everything the server can give you with the filters
   you've set. You can toggle them or reset your progress in the settings.
            `
          );
        }
        return res.json();
      })
      .then((data) => {
        toGuess.set(new Entry(data));
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
