import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category, Product } from '../../services/servicio productos/product.interface';
import { ProductService } from '../../services/servicio productos/product.service';
import { ProductoComponent } from "../../estructura/producto/producto.component";
import { SearchService } from '../../services/servicio search/search.service';

@Component({
  selector: 'app-productos-esctruct',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductoComponent],
  templateUrl: './productos-esctruct.component.html',
  styleUrls: ['./productos-esctruct.component.css'],
})
export class ProductosEsctructComponent implements OnInit {
  products: Product[] = []; // Todos los productos
  filteredProducts: Product[] = []; // Productos después de aplicar filtros
  priceRange = { min: 0, max: Infinity }; // Rango de precios
  searchTerm: string = ''; // Término de búsqueda

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Carga los productos desde la API
  private async loadProducts(): Promise<void> {
    try {
      this.products = await this.productService.getProductsList();
      this.filteredProducts = [...this.products]; // Inicializa con todos los productos
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  // Aplica filtros de búsqueda y rango de precios
  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesPrice =
        product.price >= (this.priceRange.min || 0) &&
        product.price <= (this.priceRange.max || Infinity);

      const matchesSearch =
        this.searchTerm.trim() === '' || // Sin término de búsqueda
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesPrice && matchesSearch;
    });
  }
}
