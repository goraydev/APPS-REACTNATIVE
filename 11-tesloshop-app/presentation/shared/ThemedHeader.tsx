import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "../auth/store/useAuthStore";
import { useThemeStore } from "../theme/store/useThemeStore";
import ThemedText from "./ThemedText";

interface Props {
  title: string;
}

export default function ThemedHeader({ title }: Props) {
  const areaSure = useSafeAreaInsets();
  const { theme } = useThemeStore();
  const { logout, user } = useAuthStore();

  return (
    <View
      className="bg-gray-200 dark:bg-gray-950 p-4"
      style={{ marginTop: areaSure.top }}
    >
      <View className="flex-row justify-between">
        <ThemedText className="font-kanit-regular">{title}</ThemedText>
        <View className="flex-row gap-2 items-center">
          <Pressable
            onPress={() => {
              console.log("usuarioo");
            }}
          >
            <ThemedText className="font-kanit-bold">
              {user?.fullName}
            </ThemedText>
          </Pressable>
          <Pressable className="flex-row gap-2 items-center" onPress={logout}>
            <ThemedText>Salir</ThemedText>
            <Ionicons
              name="log-out-outline"
              size={24}
              color={theme === "dark" ? "white" : "black"}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
