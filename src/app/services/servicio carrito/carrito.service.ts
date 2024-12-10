import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {RootObject } from '../../services/servicio productos/product.interface';

@Injectable({
  providedIn: 'root',
})

  export class CarritoService {
    private cartItemsSubject = new BehaviorSubject<(RootObject & { quantity: number })[]>([]);
    cartItems$ = this.cartItemsSubject.asObservable();
  
    addToCart(product: RootObject, quantity: number = 1): void {
      const currentItems = this.cartItemsSubject.value;
      const existingItem = currentItems.find(item => item.id === product.id);
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        currentItems.push({ ...product, quantity });
      }
  
      this.cartItemsSubject.next([...currentItems]);
    }
  
    getCartItems(): void {
      // Simula una llamada a la API que devuelve productos en el carrito
      setTimeout(() => {
        const mockData: (RootObject & { quantity: number })[] = [
          
        ];
        this.cartItemsSubject.next(mockData);
      }, 2000); // Simulación de tiempo de carga
    }
  
  
    calculateTotal(): number {
      return this.cartItemsSubject.value.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  
}
