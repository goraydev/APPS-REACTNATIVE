import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import ThemedActivity from "@/presentation/shared/ThemedActivity";
import { Redirect, Stack } from "expo-router";
import React, { useEffect } from "react";

export default function CheckAuthenticationLayout() {
  const { status, checkStatus } = useAuthStore();
  useEffect(() => {
    checkStatus();
  }, []);

  if (status === "checking") {
    return <ThemedActivity />;
  }

  if (status === "unauthenticated") {
    return <Redirect href={"/auth/login"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="home/index"
        options={{
          title: "Productos",
        }}
      />
    </Stack>
  );
}
