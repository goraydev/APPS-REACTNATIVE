import React from "react";
import { Switch } from "react-native";

interface Props {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export default function ThemedSwitch({ value, onValueChange, ...rest }: Props) {
  return <Switch value={value} onValueChange={onValueChange} {...rest} />;
}
