import React, { useRef } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { Movie } from '../../infraestructure/interfaces/movie.interface';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import CardMovie from './shared/CardMovie';
import { Image } from 'expo-image';

interface Props {
  movies: Movie[];
}

const MainSlideShow = ({ movies }: Props) => {
  const ref = useRef<ICarouselInstance>(null);
  const width = useWindowDimensions().width;

  return (
    <View className="h-[250px] w-full">
      <Carousel
        ref={ref}
        data={movies}
        renderItem={({ item }) => <CardMovie movie={item} width={200} height={350} />}
        width={200}
        height={350}
        style={{
          width: width,
          height: 350,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        defaultIndex={1}
      />
    </View>
  );
};

export default MainSlideShow;
