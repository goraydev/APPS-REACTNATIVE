import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';

export default function Home() {
  const { toggleColorScheme, colorScheme } = useColorScheme();
  const [stateTheme, setStateTheme] = useState<boolean>(colorScheme === 'dark');

  return (
    <View className="mx-auto">
      <Text className="text-center text-2xl dark:text-gray-400">Clase de Push Notificacion</Text>
      <Pressable
        className="mt-2 rounded-md bg-blue-500 p-4"
        onPress={() => router.push('/profile')}>
        <Text className="text-center text-white">Ir a Perfil</Text>
      </Pressable>
      <Pressable className="mt-2 rounded-md bg-green-500 p-4" onPress={() => router.push('/push')}>
        <Text className="text-center text-white">Ir a Push</Text>
      </Pressable>
      <View className="mt-2 flex-row items-center justify-between rounded-md bg-gray-400 px-4 dark:bg-slate-700">
        <Text className="text-xl dark:text-white">Light/Dark</Text>
        <Switch
          value={stateTheme}
          onValueChange={(value) => {
            toggleColorScheme();
            setStateTheme(value);
          }}
        />
      </View>
    </View>
  );
}
