import { View, Text, useWindowDimensions } from 'react-native';
import React from 'react';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedText from '@/presentation/shared/ThemedText';
import SignUp from '@/presentation/auth/components/SignUp';

export default function SignUpScreen() {
  const { height } = useWindowDimensions();
  return (
    <>
      <ThemedHeader title="Crear Usuario" />
      <SignUp />
    </>
  );
}
