import { movieApi } from '@/core/api/movie-api';
import { CastMovieDBResponse } from '@/infraestructure/interfaces/movidedb-responset';
import { CastMovie } from '@/infraestructure/interfaces/movie.interface';
import { MovieMapper } from '@/infraestructure/mappers/movie.mapper';

export const creditsAction = async (id: number): Promise<CastMovie[]> => {
  try {
    const { data } = await movieApi.get<CastMovieDBResponse>(`/${id}/credits`);
    const credits = MovieMapper.fromCastToDomain(data.cast);
    return credits;
  } catch (error) {
    console.error(error);
    throw 'Error al cargar data';
  }
};
