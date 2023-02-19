import { gameState } from "./stores";

export class Stats {
  totalRounds: number;
  correctRounds: number;
  accuracy: number;
  bestStreak: number;
  currentStreak: number;
  lastResult: boolean;

  totalGuesses: number;
  guessAvg: number;

  constructor() {
    this.totalRounds = 0;
    this.correctRounds = 0;
    this.accuracy = 0;
    this.bestStreak = 0;
    this.currentStreak = 0;
    
    this.totalGuesses = 0;
    this.guessAvg = 0;
  }

  addRound(result: boolean): void {
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
  addGuess(): void {
    this.totalGuesses++;
    this.guessAvg = parseFloat(
      (this.totalGuesses / (this.totalRounds + 1)).toFixed(2)
    );
  }
}
