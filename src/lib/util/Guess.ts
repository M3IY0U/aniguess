export class Guess {
  text: string;
  type: GuessType;

  constructor(type: GuessType, text?: string) {
    this.text = text;
    this.type = type;

    switch (type) {
      case GuessType.Success:
        this.text = `${text} ✅`;
        break;
      case GuessType.Failure:
        this.text = `${text} ❌`;
        break;
      case GuessType.Skip:
        this.text = `Skipped ⏩`;
        break;
    }
  }
}

export enum GuessType {
  Success = "success",
  Failure = "failure",
  Skip = "skip",
}
