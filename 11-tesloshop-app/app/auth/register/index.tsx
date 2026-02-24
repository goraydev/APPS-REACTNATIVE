import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, useWindowDimensions, View } from "react-native";
import ThemedButton from "../../../presentation/shared/ThemedButton";
import ThemedTextInput from "../../../presentation/shared/ThemedTextInput";

export default function RegisterScreen() {
  const { height } = useWindowDimensions();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const { register, messageBackend } = useAuthStore();
  const [isPost, setIsPost] = useState(false);
  const handleSubmit = async () => {
    if (form.email === "" || form.password === "" || form.fullName === "") {
      return Alert.alert("Error", "Los campos no pueden estar vacios", [
        { text: "OK" },
      ]);
    }
    //enviar los datos al servidor
    setIsPost(true);
    const process = await register(form.email, form.password, form.fullName);
    setIsPost(false);
    if (!process) {
      Alert.alert("Error", messageBackend);
      return;
    }

    Alert.alert("Registro exitoso", "Ya puedes iniciar sesión", [
      { text: "OK", onPress: () => router.back() },
    ]);
    setForm({ fullName: "", email: "", password: "" });
  };

  return (
    <ThemedView scroll padding>
      <View style={{ paddingTop: height * 0.3 }}>
        <ThemedText type="h1">Registrarse</ThemedText>
        <ThemedText>Por favor registre sus datos para continuar</ThemedText>
      </View>
      <View className="flex-col gap-4">
        <ThemedTextInput
          placeholder="Nombre de usuario"
          value={form.fullName}
          onChangeText={(text) => setForm({ ...form, fullName: text })}
          icon="person-outline"
        />
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
          text="Registrarse"
          onPress={handleSubmit}
          disabled={isPost}
          icon="arrow-forward-outline"
        />
      </View>
      <View className="flex-row items-center justify-center gap-2 mt-4">
        <ThemedText type="h2">¿Ya tienes cuenta?</ThemedText>
        <Link href={"/auth/login"} className="text-blue-500 text-xl">
          Inicia Sesión
        </Link>
      </View>
    </ThemedView>
  );
}
