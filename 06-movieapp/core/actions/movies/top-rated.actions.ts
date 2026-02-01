import { movieApi } from '@/core/api/movie-api';
import { MovieDBMoviesResponse } from '@/infraestructure/interfaces/movidedb-responset';
import { MovieMapper } from '@/infraestructure/mappers/movie.mapper';

interface Options {
  page?: number;
  limit?: number;
}

export const topRatedAction = async ({ page = 1, limit }: Options = {}) => {
  try {
    const { data } = await movieApi.get<MovieDBMoviesResponse>('/top_rated', {
      params: {
        page,
      },
    });
    const movies = data.results.map(MovieMapper.fromTheMovieDBToDomain);

    return movies;
  } catch (error) {
    console.error(error);
    throw 'Error al cargar data';
  }
};
