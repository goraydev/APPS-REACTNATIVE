import React from "react";
import { Image, ImageSourcePropType, useWindowDimensions } from "react-native";
import ThemedText from "../shared/ThemedText";
import ThemedView from "../shared/ThemedView";

interface Props {
  title: string;
  desc: string;
  img: ImageSourcePropType;
}
export default function CardSlide({ title, desc, img }: Props) {
  const { width } = useWindowDimensions();

  return (
    <ThemedView className="flex-1 rounded justify-center" style={{ width }}>
      <Image
        source={img}
        style={{
          width: width * 0.7,
          height: width * 0.7,
          alignSelf: "center",
        }}
      />

      <ThemedText type="h1" className="mt-4 px-2">
        {title}
      </ThemedText>
      <ThemedText className="text-center">{desc}</ThemedText>
    </ThemedView>
  );
}
