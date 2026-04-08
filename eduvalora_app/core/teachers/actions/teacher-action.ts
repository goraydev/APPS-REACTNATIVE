import { eduvaloraAPI } from '@/core/api/eduvaloraApi';
import axios from 'axios';
import { Teacher } from '../interfaces/teachers';

export const getTeachers = async () => {
  try {
    const { data } = await eduvaloraAPI.get<Teacher[]>('/docentes');

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      if (responseData?.message) {
        throw new Error(responseData.message);
      }
    }
    throw new Error('Error al obtener los docentes');
  }
};

export const getTeacherById = async (id: number) => {
  try {
    const { data } = await eduvaloraAPI.get<Teacher>(`/docentes/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      if (responseData?.message) {
        throw new Error(responseData.message);
      }
    }
    throw new Error('Error al obtener el docente');
  }
};
