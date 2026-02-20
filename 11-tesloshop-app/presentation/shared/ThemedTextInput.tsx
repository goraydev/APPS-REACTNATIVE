import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";

interface Props extends TextInputProps {
  placeholder: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  value: string;
  onChangeText: (text: string) => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function ThemedTextInput({
  value = "",
  icon,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
  ...rest
}: Props) {
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <View
      className={`flex flex-row items-center gap-4 border-x-2 border-y-2 p-2 rounded-md ${isActive ? "border-blue-600" : "border-blue-400"}`}
      onTouchStart={() => inputRef.current?.focus()}
    >
      <Ionicons name={icon} size={24} color="gray" />
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        keyboardType={keyboardType}
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
        className="text-black dark:text-white"
        placeholderTextColor="#9ca3af"
        {...rest}
      />
    </View>
  );
}
