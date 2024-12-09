export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category?: string; 
    isAvailable?: string;
    removing?: boolean;
    quantity?: number;
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