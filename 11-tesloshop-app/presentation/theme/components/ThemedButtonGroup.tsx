import ThemedText from "@/presentation/shared/ThemedText";
import { TouchableOpacity, View } from "react-native";

interface Props {
  options: string[];
  selectedOptions: string[];
  onSelect: (options: string) => void;
}

export default function ThemedButtonGroup({
  options,
  selectedOptions,
  onSelect,
}: Props) {
  return (
    <View className=" flex-row items-center justify-between gap-2 my-3">
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => onSelect(option)}
          className="flex-1 p-4 rounded-md items-center justify-center bg-blue-500"
          style={[
            selectedOptions.includes(option) && {
              backgroundColor: "#154579",
            },
          ]}
        >
          <ThemedText adjustsFontSizeToFit numberOfLines={1}>
            {option}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}
