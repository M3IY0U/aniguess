export class Entry {
  title: Title;
  coverImage: string;
  siteUrl: string;
  genres: string;
  studios: string;
  averageScore: number;
  mainCharacter: string;
  startDate: string;

  constructor(je: any) {
    this.title = je.title;
    this.coverImage = je.coverImage.extraLarge;
    this.siteUrl = je.siteUrl;
    this.genres = je.genres.join(", ");
    this.studios = je.studios.edges.map((e) => e.node.name).join(", ");
    this.averageScore = je.averageScore;
    this.mainCharacter = je.characters.edges[0].node.name.userPreferred;
    this.startDate = je.startDate.year.toString();
  }
}

export interface Title {
    romaji: string
    english: string
  }
