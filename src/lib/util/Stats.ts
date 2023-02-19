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
  }

  add(result: boolean): void {
    this.totalRounds++;
    if (result) {
      this.correctRounds++;
      this.currentStreak++;
    } else {
      this.currentStreak = 0;
    }
    if (this.currentStreak > this.bestStreak) {
      this.bestStreak = this.currentStreak;
    }

    this.accuracy = parseFloat(
      ((this.correctRounds / this.totalRounds) * 100).toFixed(2)
    );
  }
}
