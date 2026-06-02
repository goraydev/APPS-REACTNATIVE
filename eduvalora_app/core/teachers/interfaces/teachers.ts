export interface Teacher {
  id: number;
  dni: string;
  paternal_surname: string;
  maternal_surname: null | string;
  names: string;
  email: null;
  cellphone: null | string;
  category: Category;
  dedication: Dedication;
  acronym: Acronym;
  faculty: Faculty;
  rol: Rol;
  total_rating: null | string;
  total_evaluaciones: string;
  promedio_rating: null | string;
  created_at: Date;
  updated_at: Date;
}

export enum Acronym {
  FEC = 'FEC',
  Fat = 'FAT',
  Fc = 'FC',
  Fca = 'FCA',
  Fcam = 'FCAM',
  Fcm = 'FCM',
  Fcsec = 'FCSEC',
  Fdccpp = 'FDCCPP',
  Fic = 'FIC',
  Fiia = 'FIIA',
  Fimgm = 'FIMGM',
}

export enum Category {
  ContratadoDcB1 = 'CONTRATADO DC B1',
  OrdinarioAsociado = 'ORDINARIO ASOCIADO',
  OrdinarioAuxiliar = 'ORDINARIO AUXILIAR',
  OrdinarioPrincipal = 'ORDINARIO PRINCIPAL',
}

export enum Dedication {
  Contratado = 'CONTRATADO',
  DedicaciónExclusiva = 'DEDICACIÓN EXCLUSIVA',
  TiempoCompleto = 'TIEMPO COMPLETO',
  TiempoParcial = 'TIEMPO PARCIAL',
}

export enum Faculty {
  FacultadDeAdministraciónYTurismo = 'FACULTAD DE ADMINISTRACIÓN Y TURISMO',
  FacultadDeCiencias = 'FACULTAD DE CIENCIAS',
  FacultadDeCienciasAgrarias = 'FACULTAD DE CIENCIAS AGRARIAS',
  FacultadDeCienciasDelAmbiente = 'FACULTAD DE CIENCIAS DEL AMBIENTE',
  FacultadDeCienciasMédicas = 'FACULTAD DE CIENCIAS MÉDICAS',
  FacultadDeCienciasSocialesEducaciónYLaComunicación = 'FACULTAD DE CIENCIAS SOCIALES, EDUCACIÓN Y LA COMUNICACIÓN',
  FacultadDeDerechoYCienciasPolíticas = 'FACULTAD DE DERECHO Y CIENCIAS POLÍTICAS',
  FacultadDeEconomíaYContabilidad = 'FACULTAD DE ECONOMÍA Y CONTABILIDAD',
  FacultadDeIngenieríaCivil = 'FACULTAD DE INGENIERÍA CIVIL',
  FacultadDeIngenieríaDeIndustriasAlimentarias = 'FACULTAD DE INGENIERÍA DE INDUSTRIAS ALIMENTARIAS',
  FacultadDeIngenieríaDeMinasGeologíaYMetalurgia = 'FACULTAD DE INGENIERÍA DE MINAS, GEOLOGÍA Y METALURGIA',
}

export enum Rol {
  Docente = 'docente',
}

export interface Calification {
  id_user: number;
  id_teacher: number;
  rating: number;
  comment: string;
}

export interface CommentsAndRatings {
  id: number;
  photo: null | string;
  coment: string;
  rating: number;
  id_user: number;
  replies: Reply[];
  username: string;
  created_at: Date;
  id_teacher: number;
}

export interface Reply {
  photo: null | string;
  answer: string;
  id_user: number;
  username: string;
  id_answer: number;
  created_at: Date;
  id_comentrating: number;
  parent_username: null | string;
  parent_answer_id: number | null;
}

export interface FormatSendReply {
  id_user: number;
  id_comentrating: number;
  answer: string;
  parent_answer_id: number | null;
}
