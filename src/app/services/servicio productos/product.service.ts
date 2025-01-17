import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environment/environment.component';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}/products`; // Correcto ahora
  private axiosInstance: AxiosInstance;

  constructor() {
    // Configuración de Axios
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      timeout: 10000, // Opcional: tiempo de espera
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Métodos del servicio
  async getProductsList(): Promise<Product[]> {
    const response = await this.axiosInstance.get<Product[]>('');
    return response.data;
  }

  async getProductById(id: string): Promise<Product> {
    const response = await this.axiosInstance.get<Product>(`/${id}`);
    return response.data;
  }

  async createProduct(product: Product): Promise<Product> {
    const response = await this.axiosInstance.post<Product>('', product);
    return response.data;
  }

  async updateProduct(id: string, productData: Product): Promise<Product> {
    const response = await this.axiosInstance.put<Product>(`/${id}`, productData);
    return response.data;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.axiosInstance.delete(`/${id}`);
  }

  // Normalizar las imágenes de un producto
  private normalizeProductImages(product: Product): Product {
    if (product.images && Array.isArray(product.images)) {
      product.images = product.images
        .map((image) => image.trim()) // Quitar espacios en blanco
        .filter((image) => image.length > 0); // Filtrar cadenas vacías
    }
    return product;
  }

  // Carrito de compras
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  addToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.getValue();
    this.cartItemsSubject.next([...currentItems, product]);
    this.cartCountSubject.next(this.cartItemsSubject.getValue().length);
  }
}
