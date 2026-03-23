import { Student } from '../interfaces/students';

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
