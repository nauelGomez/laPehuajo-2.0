import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../services/servicio productos/product.interface';
import { ProductService } from '../../services/servicio productos/product.service';
import { SearchService } from '../../services/servicio search/search.service';

@Component({
  selector: 'app-actualizar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css'],
})
export class ActualizarProductoComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  editingProduct: Product | null = null; // Producto que se está editando
  successMessage: string = ''; // Mensaje de éxito
  showSuccess: boolean = false; // Controla la visibilidad del mensaje

  constructor(
    private productService: ProductService,
    private searchService: SearchService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      // Cargar productos
      const data = await this.productService.getProductsList();
      this.products = data;
      this.filteredProducts = data;

      // Escuchar el término de búsqueda desde el servicio
      this.searchService.searchTerm$.subscribe((term) => {
        this.searchTerm = term;
        this.applyFilters();
      });
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  // Filtrar productos por búsqueda
  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Habilitar edición
  editProduct(product: Product): void {
    this.editingProduct = { ...product }; // Clonamos para evitar modificar directamente
  }

  // Guardar cambios
  async saveChanges(): Promise<void> {
    if (this.editingProduct) {
      try {
        this.normalizeImages(); // Normalizamos las URLs de las imágenes
        await this.productService.updateProduct(
          this.editingProduct.id,
          this.editingProduct
        );

        // Recargar la lista de productos sin recargar toda la página
        const data = await this.productService.getProductsList();
        this.products = data;
        this.filteredProducts = data;

        this.closeModal();
        this.showSuccessMessage('Producto actualizado con éxito.');
      } catch (error) {
        console.error('Error al actualizar el producto:', error);
      }
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
