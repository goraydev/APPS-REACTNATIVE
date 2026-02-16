import React from "react";
import { Text, TextProps } from "react-native";

interface Props extends TextProps {
  lightColor?: string;
  className?: string;
  type?: "normal" | "h1" | "h2" | "semibold" | "link";
}

export default function ThemedText({
  children,
  className,
  type = "normal",
  ...rest
}: Props) {
  return (
    <Text
      className={[
        `text-black dark:text-gray-200`,
        type === "normal" ? "text-base" : "",
        type === "h1" ? "text-3xl" : "",
        type === "h2" ? "text-xl" : "",
        type === "semibold" ? "font-semibold" : "",
        type === "link" ? "underline" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </Text>
  );
}
