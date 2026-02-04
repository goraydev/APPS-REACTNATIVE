import {
  animationMenuRoutes,
  menuRoutes,
  uiMenuRoutes,
} from "@/constants/Routes";
import MenuItem from "@/presentation/menu/MenuIte";
import ThemedView from "@/presentation/shared/ThemedView";
import React from "react";
import { View } from "react-native";

export default function App() {
  return (
    <ThemedView padding>
      {animationMenuRoutes.map((route, index) => (
        <MenuItem
          key={route.name}
          {...route}
          isFirst={index === 0}
          isLast={index === animationMenuRoutes.length - 1}
        />
      ))}

      <View className="mt-4"></View>
      {uiMenuRoutes.map((route, index) => (
        <MenuItem
          key={route.name}
          {...route}
          isFirst={index === 0}
          isLast={index === uiMenuRoutes.length - 1}
        />
      ))}

      <View className="mt-4"></View>
      {menuRoutes.map((route, index) => (
        <MenuItem
          key={route.name}
          {...route}
          isFirst={index === 0}
          isLast={index === menuRoutes.length - 1}
        />
      ))}
    </ThemedView>
  );
}
