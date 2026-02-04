import { Colors } from "./constants/Colors";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
    "./presentation/**/*.{js,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          primary: Colors.light.primary,
          secondary: Colors.light.secondary,
          tertiary: Colors.light.tertiary,
          success: Colors.light.success,
          text: Colors.light.text,
          background: Colors.light.background,
        },
        dark: {
          primary: Colors.dark.primary,
          secondary: Colors.dark.secondary,
          tertiary: Colors.dark.tertiary,
          success: Colors.dark.success,
          text: Colors.dark.text,
          background: Colors.dark.background,
        },
      },
    },
  },
  plugins: [],
};
