import { creditsAction } from '@/core/actions/movies/credits.action';
import { nowPlayingAction } from '@/core/actions/movies/now-playing.actions';
import { oneMovieActions } from '@/core/actions/movies/one-movie.actions';
import { popularAction } from '@/core/actions/movies/popular.actions copy';
import { topRatedAction } from '@/core/actions/movies/top-rated.actions';
import { upcomingAction } from '@/core/actions/movies/upcoming.actions';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useMovies = () => {
  const nowPlayingQuery = useQuery({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: nowPlayingAction,
    staleTime: 1000 * 60 * 5,
  });

  const popularQuery = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: popularAction,
    staleTime: 1000 * 60 * 5,
  });

  const topRatedQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['movies', 'topRated'],
    queryFn: ({ pageParam }) => {
      return topRatedAction({ page: pageParam });
    },
    staleTime: 1000 * 60 * 5,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

  const upcomingQuery = useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: upcomingAction,
    staleTime: 1000 * 60 * 5,
  });

  const creditsQuery = (id: number) => {
    return useQuery({
      queryKey: ['movies', 'credits'],
      queryFn: () => creditsAction(id),
    });
  };

  const oneMovieQuery = (id: number) => {
    return useQuery({
      queryKey: ['movie', id, 'oneMovie'],
      queryFn: () => oneMovieActions(id),
    });
  };

  return {
    nowPlayingQuery,
    oneMovieQuery,
    popularQuery,
    topRatedQuery,
    upcomingQuery,
    creditsQuery,
  };
};
