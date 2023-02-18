import { gameState } from "./stores";

export class Stats {
  totalRounds: number;
  correctRounds: number;
  accuracy: number;
  bestStreak: number;
  currentStreak: number;
  lastResult: boolean;

  constructor() {
    this.totalRounds = 0;
    this.correctRounds = 0;
    this.accuracy = 0;
    this.bestStreak = 0;
    this.currentStreak = 0;
    this.lastResult = false;
  }

  add(result: boolean): void {
    this.totalRounds++;
    if (result) {
      this.correctRounds++;
    }
    if (result == true && this.lastResult == true) {
      this.currentStreak++;
    } else {
      this.currentStreak = 1;
    }
    if (this.currentStreak > this.bestStreak) {
      this.bestStreak = this.currentStreak;
    }
    this.lastResult = result;

    this.accuracy = this.correctRounds / this.totalRounds;
  }
}
