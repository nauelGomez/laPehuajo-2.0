import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Product } from '../../services/servicio productos/product.interface';
import { ProductService } from '../../services/servicio productos/product.service';
import { ProductoComponent } from '../../estructura/producto/producto.component';
import { SearchService } from '../../services/servicio search/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eliminar-producto',
  standalone: true,
  imports: [CommonModule, ProductoComponent, FormsModule],
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EliminarProductoComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  priceRange = { min: 0, max: Infinity }; // Rango de precios

  constructor(private productService: ProductService, private searchService: SearchService) {}

  async ngOnInit(): Promise<void> {
    try {
      // Cargar productos desde el servicio
      const data = await this.productService.getProductsList();
      this.products = data;
      this.filteredProducts = data;

      // Escuchar los cambios en el término de búsqueda
      this.searchService.searchTerm$.subscribe((term) => {
        this.searchTerm = term;
        this.applyFilters();
      });
    } catch (error) {
      console.error('Error al cargar la lista de productos:', error);
    }
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const searchMatch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const priceMatch =
        product.price >= (this.priceRange.min || 0) &&
        product.price <= (this.priceRange.max || Infinity);
      return searchMatch && priceMatch;
    });
  }

  // Método para eliminar un producto
  async deleteProduct(id: string): Promise<void> {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await this.productService.deleteProduct(id);
        // Actualizamos las listas al eliminar el producto
        this.products = this.products.filter(product => product.id !== id);
        this.filteredProducts = this.filteredProducts.filter(product => product.id !== id);
        alert('Producto eliminado con éxito.');
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('Hubo un error al eliminar el producto.');
      }
    }
  }
}
