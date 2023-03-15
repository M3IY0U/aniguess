import { writable } from "svelte/store";
import type { Entry } from "./Entry";
import type { Guess } from "./Guess";
import type { Gamemode } from "./Enums";

export const guessProgress = writable(0);

export const toGuess = writable(null as Entry | null);
export const pastGuesses = writable(new Array<Guess>());
export const gameState = writable("idle");
export const userEntries = writable(new Array<number>());
export const enabledFormats = writable([] as string[]);
export const gameMode = writable(null as unknown as Gamemode);
export const isDaily = writable(false);
