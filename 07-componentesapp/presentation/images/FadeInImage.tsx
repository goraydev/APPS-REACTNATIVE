import { Colors } from "@/constants/Colors";
import useAnimataion from "@/hooks/useAnimataion";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Animated,
    ImageStyle,
    StyleProp,
    View,
} from "react-native";

interface Props {
  uri: string;
  style: StyleProp<ImageStyle>;
}

export default function FadeInImage({ uri, style }: Props) {
  const [isLoading, setisLoading] = useState(true);
  const { animatedOpacity, fadeIn } = useAnimataion();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading && <ActivityIndicator color={Colors.light.primary} />}
      <Animated.Image
        source={{ uri: uri }}
        style={[
          style,
          {
            opacity: animatedOpacity,
          },
        ]}
        onLoadEnd={() => {
          fadeIn({});
          setisLoading(false);
        }}
      />
    </View>
  );
}
