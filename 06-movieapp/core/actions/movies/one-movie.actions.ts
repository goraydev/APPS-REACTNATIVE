import { movieApi } from '@/core/api/movie-api';
import { OneMovieDBResponse } from '@/infraestructure/interfaces/movidedb-responset';
import { MovieMapper } from '@/infraestructure/mappers/movie.mapper';

export const oneMovieActions = async (id: number) => {
  try {
    const { data } = await movieApi.get<OneMovieDBResponse>(`/${id}`);
    const movie = MovieMapper.fromOneMovieDBToDomain(data);
    return movie;
  } catch (error) {
    console.error(error);
    throw 'Error al cargar data';
  }
};
