import ThemedView from "@/presentation/shared/ThemedView";
import React, { useRef } from "react";
import { Animated, PanResponder } from "react-native";

const DraggableView = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x, // x,y are Animated.Value
          dy: pan.y,
        },
      ],
      {
        useNativeDriver: false,
      },
    ),
    onPanResponderRelease: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        { toValue: { x: 0, y: 0 }, useNativeDriver: false }, // Back to zero
      ).start();
    },
  });

  return (
    <ThemedView className="flex-1 justify-center items-center" padding>
      <Animated.View
        {...panResponder.panHandlers}
        className="bg-light-primary dark:bg-dark-primary rounded-md"
        style={[
          {
            width: 150,
            height: 150,
          },
          pan.getLayout(),
        ]}
      />
    </ThemedView>
  );
};

export default DraggableView;
