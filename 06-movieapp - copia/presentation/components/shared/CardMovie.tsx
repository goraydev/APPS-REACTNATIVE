import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Movie } from '@/infraestructure/interfaces/movie.interface';
import { Link } from 'expo-router';

interface Props {
  movie: Movie;
  width?: number;
  height?: number;
}

export default function CardMovie({ movie, width, height }: Props) {
  return (
    <Link href={`/movie/${movie.id}`} className="px-2 active:opacity-90">
      <Image
        source={{ uri: movie.poster }}
        className="rounded-2xl shadow-xl"
        width={width}
        height={height}
        resizeMode="cover"
      />
    </Link>
  );
}
