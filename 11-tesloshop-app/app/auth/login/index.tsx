import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedTextInput from "@/presentation/shared/ThemedTextInput";
import ThemedView from "@/presentation/shared/ThemedView";
import ThemedSwitch from "@/presentation/theme/components/ThemedSwitch";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  useWindowDimensions,
  View
} from "react-native";

export default function LoginScreen() {
  const { height } = useWindowDimensions();
  const [form, setForm] = useState({ email: "", password: "" });

  const messageEmpty = () => {
    console.log("ok");
  };

  const handleSubmit = () => {
    if (form.email === "" || form.password === "") {
      return Alert.alert("Error", "Los campos no pueden estar vacios", [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK" },
      ]);
    }

    //Enviar para autenticar
    console.log(form);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ThemedView scroll padding>
        <View style={{ paddingTop: height * 0.3 }}>
          <ThemedText type="h1">Ingresar</ThemedText>
          <ThemedText>Por favor ingrese para continuar</ThemedText>
        </View>
        <View className="flex-col gap-4">
          <ThemedTextInput
            placeholder="Email"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            icon="mail-outline"
          />
          <ThemedTextInput
            placeholder="Contraseña"
            value={form.password}
            secureTextEntry
            onChangeText={(text) => setForm({ ...form, password: text })}
            icon="lock-closed-outline"
          />
          <ThemedButton
            text="Iniciar Sesión"
            onPress={handleSubmit}
            icon="arrow-forward-outline"
          />
        </View>
        <View className="flex-row items-center justify-center gap-2 mt-4">
          <ThemedText type="h2">¿No tienes cuenta?</ThemedText>
          <Link href={"/auth/register"} className="text-blue-500 text-xl">
            Regístrate
          </Link>
        </View>
        <ThemedSwitch />
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
