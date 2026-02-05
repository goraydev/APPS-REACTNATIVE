import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { Alert, View } from "react-native";

const AlertsScreen = () => {
  const createTwoButtonAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const createThreeButtonAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Ask me later",
        onPress: () => console.log("Ask me later pressed ofof"),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  return (
    <ThemedView padding>
      <ThemedText type="h1">Alertas</ThemedText>
      <View className="flex gap-2">
        <ThemedButton onPress={createTwoButtonAlert}>Alerta 1</ThemedButton>
        <ThemedButton
          onPress={createThreeButtonAlert}
          className="bg-light-tertiary dark:bg-dark-tertiary"
        >
          Alerta 2
        </ThemedButton>
      </View>
    </ThemedView>
  );
};
export default AlertsScreen;
