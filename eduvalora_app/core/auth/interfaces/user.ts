export interface User {
  dni: number;
  id_faculty: string;
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}
export interface UserResponse {
  message: string;
  usuario: Usuario;
  token: string;
}

export interface Usuario {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  estado: string;
  photo: string;
  rol: string;
  created_at: Date;
  updated_at: Date;
}
