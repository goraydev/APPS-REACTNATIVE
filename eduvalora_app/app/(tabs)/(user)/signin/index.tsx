import { View, Text, useWindowDimensions } from 'react-native';
import React from 'react';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import ThemedSwitch from '@/presentation/theme/components/ThemedSwitch';
import SignIn from '@/presentation/auth/components/SignIn';

export default function UserScreen() {
  const { height } = useWindowDimensions();

  return (
    <>
      <ThemedHeader title="Usuario" />
      <ThemedView padding>
        <View className="mt-4">
          <ThemedSwitch />
          <View style={{ paddingTop: height * 0.2 }} />
          <SignIn />
        </View>
      </ThemedView>
    </>
  );
}
