import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RootObject } from '../../services/servicio productos/product.interface';
import { ProductService } from '../../services/servicio productos/product.service';
import { ProductoComponent } from '../../estructura/producto/producto.component';
import { SearchService } from '../../services/servicio search/search.service';

@Component({
  selector: 'app-eliminar-producto',
  standalone: true,
  imports: [CommonModule, ProductoComponent],
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {
  products: RootObject[] = [];
  filteredProducts: RootObject[] = [];
  searchTerm: string = '';

  constructor(private productService: ProductService, private searchService: SearchService) {}

  ngOnInit(): void {
    // Cargar productos desde el servicio
    this.productService.getProductsList().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });

    // Escuchar los cambios en el término de búsqueda
    this.searchService.searchTerm$.subscribe((term) => {
      this.searchTerm = term;
      this.applyFilters();
    });
  }
  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const searchMatch = product.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return searchMatch;
    });
  }
  // Método para eliminar un producto
  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        // Actualizamos las listas al eliminar el producto
        this.products = this.products.filter(product => product.id !== id);
        this.filteredProducts = this.filteredProducts.filter(product => product.id !== id);
      });
    }
  }
}
