import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';

export default function ProfileScreen() {
  const navigator = useNavigation();

  useEffect(() => {
    navigator.setOptions({
      title: 'Perfil',
    });
  }, []);

  return (
    <View>
      <Text className="dark:text-gray-400">ProfileScreen</Text>
    </View>
  );
}
