import Loading from '@/presentation/components/shared/Loading';
import { useMovies } from '@/presentation/hooks/useMovies';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, Image, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import ExternalLink from '@/presentation/components/shared/ExternalLink';
import GenresMovies from '@/presentation/components/shared/GenresMovies';
import MovieHorizontalList from '@/presentation/components/movies/MovieHorizontalList';

export default function MovieScreen() {
  const safeArea = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const { oneMovieQuery } = useMovies();
  const { data: movie, isLoading } = oneMovieQuery(Number(id));

  if (isLoading && !movie) return <Loading />;

  return (
    <ScrollView style={{ paddingTop: safeArea.top, marginBottom: safeArea.bottom }}>
      <Text className="my-2 px-2 text-center text-4xl font-bold text-blue-500">{movie?.title}</Text>
      <Image className="h-[400px] w-full" source={{ uri: movie?.backdrop }} />
      <View className="p-4">
        <View className="mb-4">
          <Text className="text-xl text-blue-400">Resumen</Text>
          <Text>{movie?.description}</Text>
        </View>
        <View className="mb-2 flex flex-row items-center gap-2">
          <Text className="text-xl text-blue-400">Rating: </Text>
          <FontAwesome name="star" size={24} color={'blue'} />
          <Text>{movie?.rating}</Text>
        </View>
        <View className="mb-2 flex flex-row items-center gap-2">
          <Text className="text-xl text-blue-400">Fecha de Lanzamiento: </Text>
          <FontAwesome name="calendar" size={24} color={'blue'} />
          <Text>{movie?.releaseDate.toLocaleDateString()}</Text>
        </View>
        <View className="mb-2 flex flex-row items-center gap-2">
          <Text className="text-xl text-blue-400">Popularidad: </Text>
          <FontAwesome name="area-chart" size={24} color={'blue'} />
          <Text>{movie?.popularity}</Text>
        </View>

        <Text className="text-xl text-blue-400">Géneros: </Text>
        {movie && <GenresMovies genres={movie?.genres} />}

        {movie?.homePage && (
          <ExternalLink url={movie.homePage} label="Visitar sitio web" icon="globe" />
        )}
      </View>
    </ScrollView>
  );
}
