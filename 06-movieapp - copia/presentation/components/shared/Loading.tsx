import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function Loading() {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator color={'purple'} size={30} />
    </View>
  );
}
