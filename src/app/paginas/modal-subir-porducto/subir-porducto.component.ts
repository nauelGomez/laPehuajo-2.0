import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/servicio productos/product.service';
import { Product } from '../../services/servicio productos/product.interface';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subir-producto',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './subir-porducto.component.html',
  styleUrls: ['./subir-porducto.component.css'],
})
export class SubirProductoComponent {
  product: Product = {
    title: '',
    price: 0,
    description: '',
    categoryId: 1,
    images: [''],
  };

  constructor(private router: Router, private productService: ProductService) {}

  onSubmit(): void {
    console.log('Producto enviado:', this.product);
    alert('Producto creado con éxito');
    this.closeTab();
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
