import Ionicons from "@expo/vector-icons/Ionicons";
import { Href, router } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import ThemedText from "../shared/ThemedText";

interface Props {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  name: string;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function MenuItem({
  title,
  icon,
  name,
  isFirst,
  isLast,
}: Props) {
  const route = name.split("/")[0] as Href;

  return (
    <Pressable
      className="bg-gray-200 dark:bg-black/20 p-2"
      onPress={() => router.push(route)}
      style={{
        borderTopLeftRadius: isFirst ? 10 : 0,
        borderTopRightRadius: isFirst ? 10 : 0,
        borderBottomLeftRadius: isLast ? 10 : 0,
        borderBottomRightRadius: isLast ? 10 : 0,
      }}
    >
      <View className="flex-row gap-4">
        <Ionicons name={icon} size={24} color={"purple"} />
        <ThemedText type="h2">{title}</ThemedText>
      </View>
    </Pressable>
  );
}
