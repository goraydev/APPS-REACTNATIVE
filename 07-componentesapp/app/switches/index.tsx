import ThemedCard from "@/presentation/shared/ThemedCard";
import ThemedSwitch from "@/presentation/shared/ThemedSwitch";
import ThemedView from "@/presentation/shared/ThemedView";
import { useState } from "react";

const Switches = () => {
  const [state, setState] = useState({
    isActive: false,
    isHungry: false,
    isHappy: false,
  });

  return (
    <ThemedView padding>
      <ThemedCard>
        {/* <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={state ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={state}
        /> */}
        <ThemedSwitch
          value={state.isActive}
          onValueChange={(value) => setState({ ...state, isActive: value })}
          text="Activo"
          className="mb-2"
        />
        <ThemedSwitch
          value={state.isHungry}
          onValueChange={(value) => setState({ ...state, isHungry: value })}
          text="Hungry"
          className="mb-2"
        />
        <ThemedSwitch
          value={state.isHappy}
          onValueChange={(value) => setState({ ...state, isHappy: value })}
          text="Happy"
          className="mb-2"
        />
      </ThemedCard>
    </ThemedView>
  );
};
export default Switches;
