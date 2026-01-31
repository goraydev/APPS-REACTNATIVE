import { Movie } from '@/infraestructure/interfaces/movie.interface';
import React from 'react';
import { View, FlatList } from 'react-native';
import CardMovie from '../shared/CardMovie';

interface Props {
  movies: Movie[];
}

export default function MovieHorizontalList({ movies }: Props) {
  return (
    <View className="shadow-2xl">
      <FlatList
        data={movies}
        renderItem={({ item }) => <CardMovie movie={item} width={150} height={250} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={false}
      />
    </View>
  );
}
