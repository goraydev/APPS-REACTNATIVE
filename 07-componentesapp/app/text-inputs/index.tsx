import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedTextnput from "@/presentation/shared/ThemedTextnput";
import ThemedView from "@/presentation/shared/ThemedView";
import { useState } from "react";
import { TextInput, View } from "react-native";
import ThemedText from "../../presentation/shared/ThemedText";

const TextInputsScreen = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  return (
    <ThemedView padding>
      <ThemedText type="h1" className="text-center mb-2">
        Formulario de registro
      </ThemedText>
      <View className="flex gap-4">
        <View className="flex gap-2">
          <TextInput
            onChangeText={(text) => setForm({ ...form, name: text })}
            placeholder="Nombre"
            autoCapitalize={"words"}
            autoCorrect={false}
            className="text-white bg-light-primary dark:bg-dark-primary rounded-md p-2 placeholder:text-gray-400"
          />
          <TextInput
            placeholder="Edad"
            className="text-white bg-light-primary dark:bg-dark-primary rounded-md p-2 placeholder:text-gray-400"
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Email"
            className="text-white bg-light-primary dark:bg-dark-primary rounded-md p-2 placeholder:text-gray-400"
            keyboardType="email-address"
          />
          <ThemedTextnput
            onChangeText={(text) => setForm({ ...form, phone: text })}
            placeHolder="Celular"
            keyboardType="phone-pad"
          />
        </View>
        <View>
          <ThemedButton onPress={() => {}}>
            <ThemedText type="h2">Enviar</ThemedText>
          </ThemedButton>
        </View>
      </View>
    </ThemedView>
  );
};
export default TextInputsScreen;
