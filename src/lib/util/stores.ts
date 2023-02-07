import { writable } from "svelte/store";
import type { Entry } from "./Entry";

export const guessProgress = writable(0);

export const toGuess = writable(null as Entry | null);
export const entries = writable(new Array<Entry>());