export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user?: User;
}

export enum Gender {
  Kid = "kid",
  Men = "men",
  Unisex = "unisex",
  Women = "women",
}

export enum Size {
  L = "L",
  M = "M",
  S = "S",
  Xl = "XL",
  Xs = "XS",
  Xxl = "XXL",
  Xxxl = "XXXL",
}

export enum Tag {
  Hoodie = "hoodie",
  Shirt = "shirt",
  Sweatshirt = "sweatshirt",
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}

export enum Email {
  Test1GoogleCOM = "test1@google.com",
}

export enum FullName {
  JuanCarlos = "Juan Carlos",
}

export enum Role {
  Admin = "admin",
}
