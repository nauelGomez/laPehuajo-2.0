import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RootObject } from '../../services/servicio productos/product.interface';
import { ProductService } from '../../services/servicio productos/product.service';
import { SearchService } from '../../services/servicio search/search.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-actualizar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormField, MatLabel, MatIcon],
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {
  products: RootObject[] = [];
  filteredProducts: RootObject[] = [];
  searchTerm: string = '';
  editingProduct: RootObject | null = null; // Producto que se está editando
  successMessage: string = ''; // Mensaje de éxito
  showSuccess: boolean = false; // Controla la visibilidad del mensaje

  constructor(
    private productService: ProductService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    // Cargar productos
    this.productService.getProductsList().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });

    // Escuchar el término de búsqueda desde el servicio
    this.searchService.searchTerm$.subscribe((term) => {
      this.searchTerm = term;
      this.applyFilters();
    });
  }

  // Filtrar productos por búsqueda
  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Habilitar edición
  editProduct(product: RootObject): void {
    this.editingProduct = { ...product }; // Clonamos para evitar modificar directamente
  }
  
  // Guardar cambios
  saveChanges(): void {
    if (this.editingProduct) {
      this.normalizeImages(); // Normalizamos las URLs de las imágenes
      this.productService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe(
        () => {
          // Recargar la lista de productos sin recargar toda la página
          this.productService.getProductsList().subscribe((data) => {
            this.products = data;
            this.filteredProducts = data;
            this.closeModal();
          });
        },
        (error) => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    }
  }
  normalizeImage(image: string): string {
    return image.replace(/^\[|\]$/g, '').replace(/^"|"$/g, '').trim();
  }
  normalizeImages(): void {
    if (this.editingProduct?.images) {
      this.editingProduct.images = this.editingProduct.images.map(this.normalizeImage);
    }
  }
  

  // Mostrar mensaje de éxito
  showSuccessMessage(message: string): void {
    this.successMessage = message;
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false; // Ocultar el mensaje después de 3 segundos
    }, 3000);
  }

  // Cerrar el modal
  closeModal(): void {
    this.editingProduct = null;
  }

  // Agregar una nueva URL de imagen
  addImage(): void {
    this.editingProduct?.images.push('');
  }

  // Eliminar una imagen del array
  removeImage(index: number): void {
    this.editingProduct?.images.splice(index, 1);
  }
}
