import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function ChatByIdScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View className="mx-auto">
      <Text className="text-black dark:text-white">ChatByIdScreen</Text>
      <Text className="text-2xl font-medium text-black dark:text-white">{id}</Text>
    </View>
  );
}
