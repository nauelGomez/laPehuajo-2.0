// Interfaces actualizadas
export interface Product {
  id: string; // ID del producto
  name: string; // Nombre del producto
  price: number; // Precio del producto
  promotionalPrice: number; // Precio promocional
  description: string; // Descripción del producto
  stock: number; // Stock disponible
  images: string[]; // Imágenes del producto
  isAvailable: boolean; // Disponibilidad
  isDeleted: boolean; // Estado de eliminación
  createdAt: Date; // Fecha de creación
  updatedAt: Date; // Fecha de actualización
  categoriesIds?: string[]; // IDs de las categorías
  categories?: Category[]; // Categorías asociadas
}

export interface Category {
  id: string; // ID de la categoría
  name: string; // Nombre de la categoría
  description: string; // Descripción de la categoría
  isAvailable: boolean; // Disponibilidad
  isDeleted: boolean; // Estado de eliminación
  images: string[]; // Imágenes de la categoría
  createdAt: Date; // Fecha de creación
  updatedAt: Date; // Fecha de actualización
  products?: Product[]; // Productos asociados
}