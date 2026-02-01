import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { CastMovie } from '@/infraestructure/interfaces/movie.interface';

interface Props {
  credits: CastMovie[];
}
export default function CreditsMovies({ credits }: Props) {
  return (
    <View className="mb-6">
      <FlatList
        data={credits}
        renderItem={({ item }) => (
          <View className="flex items-center justify-center rounded-2xl px-4 gap-1">
            <Image
              source={{ uri: item.profilePath }}
              className="rounded-2xl shadow-xl"
              width={200}
              height={250}
              resizeMode="cover"
            />
            <View className="mx-2 rounded-full bg-blue-100 px-10 py-2">
              <Text className="text-center text-blue-600">{item.name}</Text>
            </View>
            <Text className="text-center">Personaje: {item.character}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={false}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
      />
    </View>
  );
}
