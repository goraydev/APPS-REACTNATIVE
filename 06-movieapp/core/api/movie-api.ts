import axios from 'axios';

export const movieApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_MOVIE_DB_URL,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_DB_KEY}`,
  },
  params: {
    language: 'es-ES',
  },
});
