import { Injectable } from '@angular/core';
import { Product, RootObject } from './product.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  constructor (private http: HttpClient) {}

  getProductsList(): Observable<RootObject[]> {
    return this.http.get<RootObject[]>(`${this.apiUrl}?offset=0&limit=20`);
  }

  getProductById(id: number): Observable<RootObject> {
    console.log('Solicitando producto con ID:', id);
    return this.http.get<RootObject>(`https://api.escuelajs.co/api/v1/products/${id}`);
  }
  
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
  
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  addToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.getValue();

  // Asegúrate de que la cantidad siempre está definida
}
}