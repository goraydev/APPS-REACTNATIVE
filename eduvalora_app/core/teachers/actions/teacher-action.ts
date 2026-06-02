import { eduvaloraAPI } from '@/core/api/eduvaloraApi';
import axios from 'axios';
import { Calification, CommentsAndRatings, FormatSendReply, Teacher } from '../interfaces/teachers';

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

export const submitCalification = async (form: Calification) => {
  try {
    const { data } = await eduvaloraAPI.post('/calificar/comentar', form);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      if (responseData?.message) {
        throw new Error(responseData.message);
      }
    }
    throw new Error('Error al enviar la calificación');
  }
};

export const getCalificationsComments = async (id_teacher: number) => {
  try {
    const { data } = await eduvaloraAPI.get<CommentsAndRatings>(
      `/calificaciones/docente/${id_teacher}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      if (responseData?.message) {
        throw new Error(responseData.message);
      }
    }
    throw new Error('Error al obtener los comentarios y calificaciones');
  }
};

export const sendCommentReply = async (form: FormatSendReply) => {
  try {
    const { data } = await eduvaloraAPI.post('responder', form);
    console.log("comentario/respuesta: ",data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      if (responseData?.message) {
        throw new Error(responseData.message);
      }
    }
    throw new Error('Error al enviar la respuesta al comentario');
  }
};
