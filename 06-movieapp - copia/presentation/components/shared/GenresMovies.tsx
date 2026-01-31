import { View, Text, FlatList } from 'react-native';
import React from 'react';

interface Props {
  genres: string[];
}
export default function GenresMovies({ genres }: Props) {
  return (
    <View className='mb-6'>
      <FlatList
        data={genres}
        renderItem={({ item }) => (
          <View className="mx-2 rounded-full bg-blue-100 px-10 py-2">
            <Text className="text-center text-blue-600">{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={false}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
      />
    </View>
  );
}
