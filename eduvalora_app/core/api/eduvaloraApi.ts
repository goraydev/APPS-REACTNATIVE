import { SecureStorageAdapter } from '@/helpers/adapters/secure-storage';
import axios from 'axios';
import { Platform } from 'react-native';

const STAGE = process.env.EXPO_PUBLIC_STAGE || 'dev';
export const API_URL =
  STAGE === 'prod'
    ? process.env.EXPO_PUBLIC_API_ANDROID
    : Platform.OS === 'ios'
      ? process.env.EXPO_PUBLIC_API_IOS
      : process.env.EXPO_PUBLIC_API_ANDROID;

//console.log({ STAGE, API_URL });
const eduvaloraAPI = axios.create({
  baseURL: API_URL,
});

//interceptores
eduvaloraAPI.interceptors.request.use(async (config) => {
  //verificar si tenemos el token
  const token = await SecureStorageAdapter.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { eduvaloraAPI };
