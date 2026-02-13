import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface Props {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  iconName: keyof typeof Ionicons.glyphMap;
}

export default function FAB({ onPress, style, iconName }: Props) {
  return (
    <Pressable style={[styles.fab, style]} onPress={onPress}>
      <Ionicons name={iconName} size={30} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: "#b4b4b4a0",
    zIndex: 1,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 0.27,
      width: 4.5,
    },
  },
});
