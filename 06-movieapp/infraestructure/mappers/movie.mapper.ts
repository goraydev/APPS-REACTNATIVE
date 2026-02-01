import {
  Cast,
  CastMovieDBResponse,
  OneMovieDBResponse,
  Result,
} from '../interfaces/movidedb-responset';
import { CastMovie, Movie, OneMovie } from '../interfaces/movie.interface';

export class MovieMapper {
  static fromTheMovieDBToDomain = (movieDB: Result): Movie => {
    return {
      id: movieDB.id,
      title: movieDB.title,
      description: movieDB.overview,
      releaseDate: new Date(movieDB.release_date),
      poster: `https://image.tmdb.org/t/p/w500${movieDB.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${movieDB.backdrop_path}`,
      rating: movieDB.vote_average,
    };
  };

  static fromOneMovieDBToDomain = (movieDB: OneMovieDBResponse): OneMovie => {
    return {
      id: movieDB.id,
      title: movieDB.title,
      description: movieDB.overview,
      releaseDate: new Date(movieDB.release_date),
      poster: `https://image.tmdb.org/t/p/w500${movieDB.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${movieDB.backdrop_path}`,
      rating: movieDB.vote_average,
      genres: movieDB.genres.map((genre) => genre.name),
      popularity: movieDB.popularity,
      homePage: movieDB.homepage,
    };
  };

  static fromCastToDomain = (cast: CastMovieDBResponse['cast']): CastMovie[] => {
    return cast.map((cast) => {
      return {
        id: cast.id,
        name: cast.name,
        profilePath: cast.profile_path
          ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
          : 'https://i.stack.imgur.com/l60Hf.jpg',
        character: cast.character ?? 'No character',
      };
    });
  };
}
