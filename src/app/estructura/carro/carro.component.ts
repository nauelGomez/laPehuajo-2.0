import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RootObject } from '../../services/servicio productos/product.interface';

@Component({
  selector: 'app-carro',
  standalone: true,
  imports: [],
  templateUrl: './carro.component.html',
  styleUrl: './carro.component.css'
})
export class CarroComponent {
  @Input() productoInfo!: RootObject & { quantity: number }; // Información del producto con cantidad
  @Output() quantityChange = new EventEmitter<{ productId: number; quantity: number }>(); // Para notificar cambios
  @Output() removeProduct = new EventEmitter<number>(); // Para eliminar el producto del carrito

  // Disminuir la cantidad
  decreaseQuantity(): void {
    if (this.productoInfo.quantity > 1) {
      this.productoInfo.quantity--;
      this.quantityChange.emit({ productId: this.productoInfo.id, quantity: this.productoInfo.quantity });
    } else {
      // Si la cantidad es 1, elimina el producto
      this.removeProduct.emit(this.productoInfo.id);
    }
  }

  // Aumentar la cantidad
  increaseQuantity(): void {
    this.productoInfo.quantity++;
    this.quantityChange.emit({ productId: this.productoInfo.id, quantity: this.productoInfo.quantity });
  }
}
