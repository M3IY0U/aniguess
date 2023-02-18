export class Entry {
  id: number;
  title: Title;
  coverImage: string;
  siteUrl: string;
  genres: string;
  studios: string;
  averageScore: number;
  mainCharacter: string;
  startDate: string;

  constructor(res: any){
    this.id = res.id;
    this.title = {romaji: res.title_r, english: res.title_e};
    this.coverImage = res.coverImage;
    this.siteUrl = res.siteUrl;
    this.genres = res.genres;
    this.studios = res.studios;
    this.averageScore = res.averageScore;
    this.mainCharacter = res.mainCharacter;
    this.startDate = res.startDate;
  }
}

export interface Title {
    romaji: string
    english: string
  }
