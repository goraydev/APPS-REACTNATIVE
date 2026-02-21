import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Alert, useWindowDimensions, View } from "react-native";
import ThemedButton from "../../../presentation/shared/ThemedButton";
import ThemedTextInput from "../../../presentation/shared/ThemedTextInput";

export default function RegisterScreen() {
  const { height } = useWindowDimensions();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = () => {
    if (form.email === "" || form.password === "" || form.username === "") {
      return Alert.alert("Error", "Los campos no pueden estar vacios", [
        { text: "OK" },
      ]);
    }
    console.log(form);
    //enviar los datos al servidor

    //limpiar el formulario
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
          value={form.username}
          onChangeText={(text) => setForm({ ...form, username: text })}
          icon="person-outline"
        />
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
        <ThemedText type="h2">¿Ya tienes cuenta?</ThemedText>
        <Link href={"/auth/login"} className="text-blue-500 text-xl">
          Registrarse
        </Link>
      </View>
    </ThemedView>
  );
}
