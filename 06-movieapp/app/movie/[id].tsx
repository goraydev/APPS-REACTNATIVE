import React from 'react';
import Loading from '@/presentation/components/shared/Loading';
import { useMovies } from '@/presentation/hooks/useMovies';
import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import ExternalLink from '@/presentation/components/shared/ExternalLink';
import GenresMovies from '@/presentation/components/shared/GenresMovies';
import { LinearGradient } from 'expo-linear-gradient';
import CreditsMovies from '@/presentation/components/shared/CreditsMovie';

export default function MovieScreen() {
  const safeArea = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const { oneMovieQuery, creditsQuery } = useMovies();
  const { data: movie, isLoading } = oneMovieQuery(Number(id));
  const { data: credits, isLoading: isLoadingCredits } = creditsQuery(Number(id));

  if (isLoading && isLoadingCredits) return <Loading />;

  return (
    <ScrollView style={{ marginBottom: safeArea.bottom }}>
      <View className="relative h-[500px] w-full">
        <Image className="h-[500px] w-full rounded-b-3xl" source={{ uri: movie?.backdrop }} />
        <LinearGradient
          colors={['transparent', 'rgba(255, 255, 255, 0.8)']}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 0.5, y: -1 }}
          className="absolute top-0 h-full w-full"
        />
      </View>
      <Text className="my-2 px-2 text-center text-4xl font-bold text-blue-500">{movie?.title}</Text>
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
        <Text className="text-xl text-blue-400">Créditos: </Text>
        {credits && <CreditsMovies credits={credits} />}

        {movie?.homePage && (
          <ExternalLink url={movie.homePage} label="Visitar sitio web" icon="globe" />
        )}
      </View>
    </ScrollView>
  );
}
