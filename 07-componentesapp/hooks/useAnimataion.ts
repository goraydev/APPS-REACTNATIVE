import { useRef } from "react";
import { Animated, Easing } from "react-native";

export default function useAnimataion() {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedTop = useRef(new Animated.Value(0)).current;

  const fadeIn = ({
    duration = 300,
    toValue = 1,
    easing = Easing.linear,
    callback = () => {},
  }) => {
    Animated.timing(animatedOpacity, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
      easing: easing,
    }).start(callback);
  };

  const fadeOut = ({
    duration = 300,
    toValue = 0,
    easing = Easing.ease,
    callback = () => {},
  }) => {
    Animated.timing(animatedOpacity, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
      easing: easing,
    }).start(callback);
  };

  const startMovingY = ({
    initialPosition = -100,
    duration = 100,
    toValue = 0,
    easing = Easing.linear,
    callback = () => {},
  }) => {
    animatedTop.setValue(initialPosition);
    Animated.timing(animatedTop, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
      easing: easing,
    }).start(callback);
  };

  return {
    animatedOpacity,
    animatedTop,

    fadeIn,
    fadeOut,
    startMovingY,
  };
}
