export interface Product {
  title: string; // Título del producto
  price: number; // Precio del producto
  description: string; // Descripción del producto
  categoryId: number; // ID de la categoría
  images: string[];
  }

  export interface RootObject {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
  }
  interface Category {
    id: number;
    name: string;
    image: string;
  }