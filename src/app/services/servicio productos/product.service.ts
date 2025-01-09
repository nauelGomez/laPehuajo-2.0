import { Injectable } from '@angular/core';
import { Product } from './product.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) {}

  // Obtener lista de productos
  getProductsList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`).pipe(
      map((products: Product[]) => products.map(product => this.normalizeProductImages(product)))
    );
  }

  // Obtener un producto por ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      map((product: Product) => this.normalizeProductImages(product))
    );
  }

  // Crear un nuevo producto
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Actualizar un producto existente
  updateProduct(id: string, productData: Product): Observable<Product> {
    const normalizedProduct = this.normalizeProductImages(productData);
    return this.http.put<Product>(`${this.apiUrl}/${id}`, normalizedProduct);
  }

  // Eliminar un producto
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Normalizar las imágenes de un producto
  private normalizeProductImages(product: Product): Product {
    if (product.images && Array.isArray(product.images)) {
      product.images = product.images.map(image => image.trim());
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