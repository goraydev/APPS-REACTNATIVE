import { movieApi } from '@/core/api/movie-api';
import { MovieDBMoviesResponse } from '@/infraestructure/interfaces/movidedb-responset';
import { MovieMapper } from '@/infraestructure/mappers/movie.mapper';

export const popularAction = async () => {
  try {
    const { data } = await movieApi.get<MovieDBMoviesResponse>('/popular');
    const movies = data.results.map(MovieMapper.fromTheMovieDBToDomain);

    return movies;
  } catch (error) {
    console.error(error);
    throw 'Error al cargar data';
  }
};
