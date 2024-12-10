import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RootObject } from '../../services/servicio productos/product.interface';
import { ProductService } from '../../services/servicio productos/product.service';
import { ProductoComponent } from "../../estructura/producto/producto.component";
import { SearchService } from '../../services/servicio search/search.service';




@Component({
  selector: 'app-productos-esctruct',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductoComponent],
  templateUrl: './productos-esctruct.component.html',
  styleUrl: './productos-esctruct.component.css'
})
export class ProductosEsctructComponent {

  products: RootObject[] = [];
  filteredProducts: RootObject[] = [];
  searchTerm: string = '';
  
  priceRange: { min: number, max: number } = { min: 0, max: 10000 };
  selectedCategory: string = '';

  categories: string[] = ['Mieles', 'Pastas', 'Frutos Secos'];

  constructor(private service: ProductService, private searchService: SearchService) {}

  ngOnInit(): void {
    this.service.getProductsList().subscribe((data) => {
      console.log('Datos recibidos de la API:', data);
      this.products = data;
      this.filteredProducts = data;
      
    });

    this.searchService.searchTerm$.subscribe((term) => {
      this.searchTerm = term;
      this.applyFilters();
    });


  }

  // Filtrar por precio y categoría
  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const priceMatch = product.price >= this.priceRange.min && product.price <= this.priceRange.max;
      const categoryMatch = this.selectedCategory ? product.category.name === this.selectedCategory : true;
      const searchMatch = product.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return priceMatch && categoryMatch && searchMatch;
    });
  }

  // Resetear filtros
  resetFilters(): void {
    this.priceRange = { min: 0, max: 10000 };
    this.selectedCategory = '';
    this.searchTerm = ''; // Resetear el término de búsqueda
    this.filteredProducts = [...this.products];
  }
  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }
  
}
