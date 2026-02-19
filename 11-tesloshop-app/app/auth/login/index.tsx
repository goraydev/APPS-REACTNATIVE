import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import ThemedSwitch from "@/presentation/theme/components/ThemedSwitch";
import {
  KeyboardAvoidingView,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

export default function LoginScreen() {
  const { height } = useWindowDimensions();
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ThemedView scroll padding>
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type="h1">Ingresar</ThemedText>
          <ThemedText>Por favor ingrese para continuar</ThemedText>
        </View>
        <View className="flex-col gap-4">
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border-x-2 border-y-2 p-2 border-blue-500 dark:placeholder:text-gray-400"
          />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            className="border-x-2 border-y-2 p-2 border-blue-500 dark:placeholder:text-gray-400"
          />
        </View>
        <ThemedSwitch />
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
