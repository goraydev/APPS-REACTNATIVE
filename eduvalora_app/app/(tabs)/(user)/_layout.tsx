import React, { useEffect } from 'react';
import { Redirect, router, Stack } from 'expo-router';
import { useAuthStore } from '@/presentation/auth/store/store';
import ThemedActivity from '@/presentation/shared/ThemedActivity';

export default function StackUserLayout() {
  const { status, checkStatus, user } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/(tabs)/(user)/signin');
    }
  }, [status]);

  if (status === 'checking') {
    return <ThemedActivity />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="settings/index" />
      <Stack.Screen name="validatestudent/index" />
      <Stack.Screen name="signin/index" />
      <Stack.Screen name="signup/index" />
    </Stack>
  );
}
