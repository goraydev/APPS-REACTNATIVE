import { eduvaloraAPI } from '@/core/api/eduvaloraApi';
import { Student } from '../interfaces/students';
import { User, UserLogin, UserResponse, Usuario } from '../interfaces/user';
import axios from 'axios';

export const getFaculties = async () => {
  try {
    const url = `${process.env.EXPO_PUBLIC_API_UNASAM}/facultades`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener facultades');
  }
};

export const validateStudent = async (dni: string, faculty: string) => {
  try {
    const url = `${process.env.EXPO_PUBLIC_API_UNASAM}/biblioteca/facultades/${faculty}`;
    const res = await fetch(url);
    const data: Student[] = await res.json();

    const student = data.filter((c) => c.alumno.dni === dni);

    if (student.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    throw new Error('Error al validar el estudiante');
  }
};

export const createUser = async (newUser: User) => {
  try {
    console.log(newUser);
    const { data } = await eduvaloraAPI.post('/usuarios/estudiantes', newUser);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;

      if (responseData?.errores) {
        const messages = Object.values(responseData.errores)
          .map((e: any) => `• ${e.msg}`)
          .join('\n');
        throw new Error(messages);
      }

      if (responseData?.message) {
        throw new Error(responseData.message);
      }
      throw new Error('Error desconocido al crear el usuario');
    }
  }
};

export const login = async (form: UserLogin) => {
  try {
    const { data } = await eduvaloraAPI.post<UserResponse>('/login', form);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      if (responseData?.message) {
        throw new Error(responseData.message);
      }
    }
    throw new Error('Error al ingresar al sistema');
  }
};

export const authCheckStatus = async () => {
  try {
    const { data } = await eduvaloraAPI.get<UserResponse>('/renew');
    return data;
  } catch (error) {
    return null;
  }
};

export const updateUser = async (username: string, email: string, idUser: number) => {
  try {
    const { data } = await eduvaloraAPI.put<Usuario>(`/usuarios/${idUser}`, {
      username,
      email,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      if (responseData?.message) {
        throw new Error(responseData.message);
      }
    }
    throw new Error('Error al ingresar al sistema');
  }
};

export const updatePhoto = async (id: number, base64: string, username: string) => {
  try {
    const { data } = await eduvaloraAPI.put<Usuario>(`/usuarios/foto/${id}`, {
      image: base64,
      username,
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      if (responseData?.message) {
        throw new Error(responseData.message);
      }
    }
    throw new Error('Error al actualizar la foto de perfil');
  }
};
