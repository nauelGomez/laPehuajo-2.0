import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RootObject } from '../../services/servicio productos/product.interface';
import { ProductService } from '../../services/servicio productos/product.service';
import { ProductoComponent } from "../../estructura/producto/producto.component";
import { ActivatedRoute, Params } from '@angular/router';





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
  
  priceRange: { min: number, max: number } = { min: 0, max: 10000 };
  selectedCategory: string = '';
  searchQuery: string = '';
  
  categories: string[] = ['Mieles', 'Pastas', 'Frutos Secos'];

  constructor(private service: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.service.getProductsList().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
  
      this.route.queryParams.subscribe((params: Params) => {
        this.searchQuery = params['search'] || '';
        this.applyFilters()
      });
    });
  }
  

  // Filtrar por precio y categoría
  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const priceMatch = product.price >= this.priceRange.min && product.price <= this.priceRange.max;
      const categoryMatch = this.selectedCategory ? product.category.name === this.selectedCategory : true;
      const searchMatch = this.searchQuery ? product.title.toLowerCase().includes(this.searchQuery.toLowerCase()) : true;
      return priceMatch && categoryMatch && searchMatch;
    });
  }

  // Resetear filtros
  resetFilters(): void {
    this.priceRange = { min: 0, max: 10000 };
    this.selectedCategory = '';
    this.filteredProducts = [...this.products];
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }
  
}
