import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/servicio productos/product.service';
import { Product } from '../../services/servicio productos/product.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subir-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subir-porducto.component.html',
  styleUrls: ['./subir-porducto.component.css'],
})
export class SubirProductoComponent {
  product: Product = {
    id: '',
    name: '',
    price: 0,
    promotionalPrice: 0,
    description: '',
    stock: 0,
    images: [''],
    isAvailable: true,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    categoriesIds: [],
    categories: [],
  };

  constructor(private router: Router, private productService: ProductService) {}

  async onSubmit(): Promise<void> {
    console.log('Datos del producto a enviar:', this.product);
    try {
      const response = await this.productService.createProduct(this.product);
      console.log('Producto creado con éxito:', response);
      alert('Producto creado con éxito');
      this.closeTab();
    } catch (error) {
      console.error('Error al crear el producto:', error);
      alert('Hubo un error al crear el producto. Revisa la consola para más detalles.');
    }
  }

  closeTab(): void {
    this.router.navigate(['/admin-panel']);
  }

  addImage(): void {
    this.product.images.push('');
  }

  removeImage(index: number): void {
    this.product.images.splice(index, 1);
  }
}
