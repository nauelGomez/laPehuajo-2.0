import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/servicio productos/product.service';
import { Product } from '../../services/servicio productos/product.interface';

@Component({
  selector: 'app-modal-subir-porducto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-subir-porducto.component.html',
  styleUrl: './modal-subir-porducto.component.css'
})
export class ModalSubirPorductoComponent {
  product: Product = {
    title: '',
    price: 0,
    description: '',
    categoryId: 1,
    images: [''],
  };

  constructor(private http: HttpClient, private productService: ProductService) {}
  @Output() closeModalEvent = new EventEmitter<void>();

  closeModal(): void {
    this.closeModalEvent.emit(); // Emite el evento para cerrar el modal
  }
  onSubmit(): void {
    this.productService.createProduct(this.product).subscribe(
      (response) => {
        alert('Producto creado con éxito!');
        this.closeModal();
      },
      (error) => {
        console.error('Error al crear el producto:', error);
      }
    );
  }


}
