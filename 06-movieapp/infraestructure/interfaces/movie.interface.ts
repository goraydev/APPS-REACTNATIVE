export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  rating: number;
  poster: string;
  backdrop: string;
}

export interface OneMovie extends Movie {
  genres: string[];
  popularity: number;
  homePage: string;
}
