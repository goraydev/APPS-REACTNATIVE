import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainSlideShow from '@/presentation/components/MainSlideShow';
import MovieHorizontalList from '@/presentation/components/movies/MovieHorizontalList';
import Loading from '@/presentation/components/shared/Loading';
import { useMovies } from '@/presentation/hooks/useMovies';

export default function HomeScreen() {
  const { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery } = useMovies();
  const safeArea = useSafeAreaInsets();
  const { data: movies, isLoading } = nowPlayingQuery;
  const { data: popularMovies, isLoading: loadingPopular } = popularQuery;
  const { data: topRatedMovies, isLoading: loadingTopRated } = topRatedQuery;
  const { data: upcomingMovies, isLoading: loadingUpcoming } = upcomingQuery;

  if (isLoading && loadingPopular && loadingTopRated && loadingUpcoming) return <Loading />;

  return (
    <ScrollView style={{ marginTop: safeArea.top, marginBottom: safeArea.bottom }}>
      <Text className="mt-4 px-4 text-center text-2xl font-bold">Movie App</Text>
      {/* Carrusel */}
      <MainSlideShow movies={movies ?? []} />
      <Text className="mb-2 mt-32 px-4 text-center text-2xl font-bold">Populares</Text>
      <MovieHorizontalList movies={popularMovies ?? []} />
      <Text className="mb-2 mt-6 px-4 text-center text-2xl font-bold">Mejores Calificadas</Text>
      <MovieHorizontalList
        movies={topRatedMovies?.pages.flat() ?? []}
        loadNextPage={topRatedQuery.fetchNextPage}
      />
      <Text className="mb-2 mt-6 px-4 text-center text-2xl font-bold">Próximos Estrenos</Text>
      <MovieHorizontalList movies={upcomingMovies ?? []} />
    </ScrollView>
  );
}
