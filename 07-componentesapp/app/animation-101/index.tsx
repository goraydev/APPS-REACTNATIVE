import useAnimataion from "@/hooks/useAnimataion";
import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedView from "@/presentation/shared/ThemedView";
import { Animated, Easing, View } from "react-native";

const Animation101Screen = () => {
  /* const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedTop = useRef(new Animated.Value(-100)).current; */

  const { animatedOpacity, animatedTop, fadeIn, fadeOut, startMovingY } =
    useAnimataion();

  /* const fadeIn = () => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(animatedTop, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.sin,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => animatedTop.setValue(-100));
  }; */

  return (
    <ThemedView padding className="justify-center items-center flex-1">
      <Animated.View
        className="bg-light-success dark:bg-dark-success rounded-xl mb-4"
        style={{
          width: 150,
          height: 150,
          opacity: animatedOpacity,
          transform: [{ translateY: animatedTop }],
        }}
      />
      <ThemedButton
        onPress={() => {
          fadeIn({ toValue: 1, duration: 300 });
          startMovingY({ toValue: 0, duration: 1000, easing: Easing.bounce });
        }}
      >
        Faden In
      </ThemedButton>
      <View className="mt-2" />
      <ThemedButton
        onPress={() => {
          fadeOut({ toValue: 0, duration: 300 });
          startMovingY({
            toValue: -100,
            duration: 2000,
            easing: Easing.cubic,
          });
        }}
      >
        Faden Out
      </ThemedButton>
    </ThemedView>
  );
};
export default Animation101Screen;
