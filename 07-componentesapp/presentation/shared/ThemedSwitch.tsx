import React from "react";
import { Platform, Pressable, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import ThemedText from "./ThemedText";

interface Props {
  text?: string;
  value: boolean;
  className?: string;
  onValueChange?: (value: boolean) => void;
}

const isAndroid = Platform.OS === "android";

export default function ThemedSwitch({
  text,
  value,
  className,
  onValueChange,
}: Props) {
  return (
    <Pressable
      className={`flex flex-row items-center justify-between active:opacity-80 ${className}`}
      onPress={() => onValueChange?.(!value)}
    >
      {text ? <ThemedText type="h2">{text}</ThemedText> : <View />}
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={isAndroid ? "blue" : "blue"}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
      />
    </Pressable>
  );
}
