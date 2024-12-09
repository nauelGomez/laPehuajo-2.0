import { Injectable } from '@angular/core';
import { Product, RootObject } from './product.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor (private http: HttpClient) {}

  getProductsList(): Observable<RootObject[]>
  {
   return this.http.get<RootObject[]>(`https://api.escuelajs.co/api/v1/products?offset=0&limit=10`);
  }
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  addToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.getValue();

  // Asegúrate de que la cantidad siempre está definida
  const existingProduct = currentItems.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity = (existingProduct.quantity || 0) + 1;
  } else {
    currentItems.push({ ...product, quantity: 1 });
  }

  this.cartItemsSubject.next([...currentItems]);
  this.updateCartCount();
  }

  updateCartCount(): void {
    const totalCount = this.cartItemsSubject
      .getValue()
      .reduce((count, item) => count + (item.quantity || 0), 0);
    this.cartCountSubject.next(totalCount);
  }
}
