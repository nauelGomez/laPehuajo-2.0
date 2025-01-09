import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../services/servicio productos/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private cartItemsSubject = new BehaviorSubject<(Product & { quantity: number })[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ ...product, quantity });
    }

    this.cartItemsSubject.next([...currentItems]);
  }
  removeFromCart(productId: string): void {
    const updatedItems = this.cartItemsSubject.value.filter(item => item.id !== productId);
    this.cartItemsSubject.next(updatedItems);
  }
  getCartItems(): void {
    const currentItems = this.cartItemsSubject.value;
    this.cartItemsSubject.next([...currentItems]);
  }

  calculateTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
