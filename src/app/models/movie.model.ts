// Movie model for API responses
// TypeScript interface representing a movie object returned by the TMDB API.

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}