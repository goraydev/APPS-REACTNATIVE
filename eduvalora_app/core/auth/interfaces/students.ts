export interface Student {
  alumno: StudentUnasam;
  escuela: Escuela;
  facultad: Escuela;
  ultimo_semestre_matriculado: string;
}

export interface StudentUnasam {
  codigo: string;
  apellido_paterno: string;
  apellido_materno: string;
  nombres: string;
  nombre_completo: string;
  dni: string;
  direccion: string;
  celular: string;
  telefono: string;
  correo_institucional: string;
  correo_personal: string;
}

export interface Escuela {
  nombre: string;
  id: string;
}