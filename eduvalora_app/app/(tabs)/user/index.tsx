import { View, Text } from 'react-native';
import React from 'react';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import ThemedSwitch from '@/presentation/theme/components/ThemedSwitch';
import SignIn from '@/core/auth/components/SignIn';

export default function UserScreen() {
  return (
    <>
      <ThemedHeader title="Usuario" />
      <ThemedView padding>
        <View className="mt-4">
          <ThemedSwitch />
          <View className="mt-8" />
          <SignIn />
        </View>
      </ThemedView>
    </>
  );
}
