import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  className?: string;
  placeHolder?: string;
  onChangeText: (text: string) => void;
}

export default function ThemedTextnput({
  className,
  placeHolder,
  onChangeText,
  ...rest
}: Props) {
  return (
    <TextInput
      onChangeText={onChangeText}
      placeholder={placeHolder}
      className={`text-white ${className} bg-light-primary dark:bg-dark-primary rounded-md p-2 placeholder:text-gray-400`}
      {...rest}
    />
  );
}
