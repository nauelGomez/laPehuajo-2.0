import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environment/environment.component';
import { Category, Product } from './product.interface';

// Función para verificar si localStorage está disponible
function isLocalStorageAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  } catch (error) {
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}/products`;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para incluir el token en las solicitudes
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (isLocalStorageAvailable()) {
          const token = localStorage.getItem('authToken');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // Métodos del servicio
  async getProductsList(): Promise<Product[]> {
    try {
      const response = await this.axiosInstance.get<Product[]>('');
      // Guardar productos en localStorage si está disponible
      if (isLocalStorageAvailable()) {
        localStorage.setItem('products', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);

      // Si hay un error y localStorage está disponible, intenta usar datos en caché
      if (isLocalStorageAvailable()) {
        const cachedProducts = localStorage.getItem('products');
        if (cachedProducts) {
          console.warn('Usando productos desde localStorage.');
          return JSON.parse(cachedProducts);
        }
      }
      throw error; // Propaga el error si no hay datos disponibles
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await this.axiosInstance.get<Product>(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
      throw error;
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      const response = await this.axiosInstance.post<Product>('', product);
      return response.data;
    } catch (error) {
      console.error('Error al crear un producto:', error);
      throw error;
    }
  }

  async updateProduct(id: string, productData: Product): Promise<Product> {
    try {
      const response = await this.axiosInstance.put<Product>(`/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el producto con ID ${id}:`, error);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await this.axiosInstance.delete(`/${id}`);
    } catch (error) {
      console.error(`Error al eliminar el producto con ID ${id}:`, error);
      throw error;
    }
  }

  private normalizeProductImages(product: Product): Product {
    if (product.images && Array.isArray(product.images)) {
      product.images = product.images
        .map((image) => image.trim())
        .filter((image) => image.length > 0);
    }
    return product;
  }

  // Gestión del carrito
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  addToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.getValue();
    this.cartItemsSubject.next([...currentItems, product]);
    this.cartCountSubject.next(this.cartItemsSubject.getValue().length);

    // Guardar el carrito en localStorage
    if (isLocalStorageAvailable()) {
      localStorage.setItem('cart', JSON.stringify(this.cartItemsSubject.getValue()));
    }
  }

  async getCategoriesList(): Promise<Category[]> {
    const response = await this.axiosInstance.get<Category[]>('/categories');
    return response.data;
  }
  
}
