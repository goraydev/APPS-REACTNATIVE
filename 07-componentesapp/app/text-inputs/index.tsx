import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedCard from "@/presentation/shared/ThemedCard";
import ThemedTextnput from "@/presentation/shared/ThemedTextnput";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import ThemedText from "../../presentation/shared/ThemedText";

const TextInputsScreen = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <ScrollView className="px-2" keyboardShouldPersistTaps="handled">
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
              onChangeText={(text) => setForm({ ...form, age: text })}
              className="text-white bg-light-primary dark:bg-dark-primary rounded-md p-2 placeholder:text-gray-400"
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Email"
              onChangeText={(text) => setForm({ ...form, email: text })}
              className="text-white bg-light-primary dark:bg-dark-primary rounded-md p-2 placeholder:text-gray-400"
              keyboardType="email-address"
            />
          </View>
          <View>
            <ThemedButton onPress={() => {}}>
              <ThemedText type="h2">Enviar</ThemedText>
            </ThemedButton>
          </View>
        </View>
        <ThemedCard className="my-2">
          <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
        </ThemedCard>
        <ThemedCard className="my-2">
          <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
        </ThemedCard>
        <ThemedCard className="my-2">
          <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
        </ThemedCard>
        <ThemedCard className="my-2">
          <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
        </ThemedCard>
        <ThemedCard className="my-2">
          <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
        </ThemedCard>
        <ThemedCard className="my-2">
          <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
        </ThemedCard>
        <ThemedCard className="my-2">
          <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
        </ThemedCard>
        <ThemedCard className="my-2">
          <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
        </ThemedCard>
        <ThemedCard className="my-2">
          <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
        </ThemedCard>
        <ThemedCard className="my-2">
          <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
        </ThemedCard>
        <ThemedCard className="my-2">
          <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
        </ThemedCard>
        <ThemedCard className="my-2">
          <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
        </ThemedCard>
        <ThemedCard className="my-2">
          <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
        </ThemedCard>
        <ThemedCard className="my-2">
          <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
        </ThemedCard>
        <ThemedCard className="my-2">
          <ThemedText>{JSON.stringify(form, null, 2)}</ThemedText>
        </ThemedCard>
      </ScrollView>

      <View className="w-full bg-light-primary dark:bg-dark-primary/50 p-4 rounded-xl">
        <ThemedTextnput
          onChangeText={(text) => setForm({ ...form, phone: text })}
          placeHolder="Celular"
          keyboardType="phone-pad"
        />
      </View>
    </KeyboardAvoidingView>
  );
};
export default TextInputsScreen;
