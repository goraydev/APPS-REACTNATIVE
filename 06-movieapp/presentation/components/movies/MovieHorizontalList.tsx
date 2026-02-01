import { Movie } from '@/infraestructure/interfaces/movie.interface';
import React, { useRef, useState } from 'react';
import { View, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import CardMovie from '../shared/CardMovie';

interface Props {
  movies: Movie[];
  loadNextPage?: () => void;
}

export default function MovieHorizontalList({ movies, loadNextPage }: Props) {
  const isLoading = useRef(false);

  //forma con el onScroll
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) return;
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isEndClosed = contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;

    if (!isEndClosed) return;
    isLoading.current = true;

    console.log('cargar siguiebtes peliculas');
    loadNextPage && loadNextPage();
  };

  //Forma usando el onReached
  const onScrollEndDrag = () => {
    if (isLoading.current) return;
    loadNextPage && loadNextPage();
    isLoading.current = false;
  };

  return (
    <View className="shadow-2xl">
      <FlatList
        data={movies}
        renderItem={({ item }) => <CardMovie movie={item} width={150} height={250} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={false}
        onEndReachedThreshold={0.8}
        onEndReached={() => onScrollEndDrag()}
      />
    </View>
  );
}
