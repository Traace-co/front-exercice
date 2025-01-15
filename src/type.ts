export interface Movie {
  id: number;
  title: string;
  rating: number;
  year: number;
  runtime: string;
  genres: string[];
  director: string;
  actors: string;
  plot: string;
  posterUrl: string;
}