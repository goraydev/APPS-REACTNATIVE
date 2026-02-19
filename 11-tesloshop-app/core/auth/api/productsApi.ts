import axios from "axios";
import { Platform } from "react-native";

const STAGE = process.env.EXPO_PUBLIC_STAGE || "dev";

export const API_URL =
  STAGE === "prod"
    ? process.env.EXPO_PUBLIC_API_ANDROID
    : Platform.OS === "ios"
      ? process.env.EXPO_PUBLIC_API_IOS
      : process.env.EXPO_PUBLIC_API_ANDROID;

const productsApi = axios.create({
  baseURL: API_URL,
});

//interceptores

export { productsApi };

