import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { router } from "expo-router";

const ModalScreen = () => {
  return (
    <ThemedView padding>
      <ThemedText>ModalScreen</ThemedText>
      <ThemedButton onPress={() => router.push("/modal/modal-window")}>
        Mostrar Modal
      </ThemedButton>
    </ThemedView>
  );
};
export default ModalScreen;
