import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../services/servicio productos/product.interface';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private cartKey = 'cartItems';
  private cartItemsSubject = new BehaviorSubject<(Product & { quantity: number })[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.loadCartFromLocalStorage();
  }

  private saveCartToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.cartKey, JSON.stringify(this.cartItemsSubject.value));
    }
  }

  private loadCartFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedCart = localStorage.getItem(this.cartKey);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        this.cartItemsSubject.next(parsedCart);
      }
    }
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ ...product, quantity });
    }

    this.cartItemsSubject.next([...currentItems]);
    this.saveCartToLocalStorage();
  }

  removeFromCart(productId: string): void {
    const updatedItems = this.cartItemsSubject.value.filter(item => item.id !== productId);
    this.cartItemsSubject.next(updatedItems);
    this.saveCartToLocalStorage();
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.saveCartToLocalStorage();
  }

  calculateTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
