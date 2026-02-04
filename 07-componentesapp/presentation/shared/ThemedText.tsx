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
        `text-light-text dark:text-dark-text`,
        type === "normal" ? "text-base" : "",
        type === "h1" ? "text-3xl" : "",
        type === "h2" ? "text-xl" : "",
        type === "semibold" ? "font-semibold" : "",
        type === "link" ? "underline" : "",
        className,
      ].join(" ")}
      /* style={
        type === "normal"
          ? {}
          : type === "h1"
            ? { fontSize: 32, fontWeight: "bold", lineHeight: 32 }
            : type === "h2"
              ? { fontSize: 20, fontWeight: "bold", lineHeight: 24 }
              : type === "semibold"
                ? { fontSize: 16, fontWeight: "600", lineHeight: 24 }
                : type === "link"
                  ? {
                      fontSize: 16,
                      fontWeight: "600",
                      lineHeight: 24,
                      color: "#0a7ea4",
                      textDecorationLine: "underline",
                    }
                  : {}
      } */
      {...rest}
    >
      {children}
    </Text>
  );
}
