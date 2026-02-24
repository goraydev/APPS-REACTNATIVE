import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedTextInput from "@/presentation/shared/ThemedTextInput";
import ThemedView from "@/presentation/shared/ThemedView";
import ThemedSwitch from "@/presentation/theme/components/ThemedSwitch";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  useWindowDimensions,
  View,
} from "react-native";

export default function LoginScreen() {
  const [isPost, setIsPost] = useState(false);
  const { height } = useWindowDimensions();
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuthStore();

  const handleSubmit = async () => {
    if (form.email === "" || form.password === "") {
      return Alert.alert("Error", "Los campos no pueden estar vacios", [
        { text: "OK" },
      ]);
    }

    //Enviar datos al servidor para autenticar
    setIsPost(true);
    const wasSucessful = await login(form.email, form.password);
    setIsPost(false);

    if (wasSucessful) {
      router.replace("/home");
      setForm({ email: "", password: "" });
      return;
    }

    Alert.alert("Error", "Usuario o contraseña incorrectos", [{ text: "OK" }]);
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
            keyboardType="email-address"
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
            disabled={isPost}
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
