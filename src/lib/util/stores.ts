import { writable } from "svelte/store";
import type { Entry } from "./Entry";
import type { Guess } from "./Guess";

export const guessProgress = writable(0);

export const toGuess = writable(null as Entry | null);
export const entries = writable(new Array<Entry>());
export const pastGuesses = writable(new Array<Guess>());
export const gameState = writable("idle");
export const userEntries = writable(new Array<number>());
export const enabledFormats = writable(["TV", "MOVIE", "ONA"]);