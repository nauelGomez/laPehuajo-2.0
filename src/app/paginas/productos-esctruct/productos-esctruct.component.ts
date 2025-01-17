import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../services/servicio productos/product.interface';
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
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  priceRange: { min: number; max: number } = { min: 0, max: 10000 };
  selectedCategory: string = '';

  categories: string[] = ['Mieles', 'Pastas', 'Frutos Secos'];

  constructor(private service: ProductService, private searchService: SearchService) {}

  async ngOnInit(): Promise<void> {
    try {
      const data: Product[] = await this.service.getProductsList();
      console.log('Datos recibidos de la API:', data);
      this.products = data;
      this.filteredProducts = [...data];

      // Escuchar los cambios en el término de búsqueda
      this.searchService.searchTerm$.subscribe((term) => {
        this.searchTerm = term;
        this.applyFilters();
      });
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  }

  // Filtrar por precio, categoría y búsqueda
  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const priceMatch = product.price >= this.priceRange.min && product.price <= this.priceRange.max;

      const categoryMatch = this.selectedCategory
        ? product.categories?.some((cat) => cat.name === this.selectedCategory)
        : true;

      const searchMatch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());

      return priceMatch && categoryMatch && searchMatch;
    });
  }

  // Resetear filtros
  resetFilters(): void {
    this.priceRange = { min: 0, max: 10000 };
    this.selectedCategory = '';
    this.searchTerm = '';
    this.filteredProducts = [...this.products];
  }

  // Seleccionar categoría
  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }
}
