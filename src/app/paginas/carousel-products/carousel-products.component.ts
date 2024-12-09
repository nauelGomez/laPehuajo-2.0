import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MatIcon } from '@angular/material/icon';
import { ProductService } from '../../services/servicio productos/product.service';
import { Product } from '../../services/servicio productos/product.interface';

@Component({
  selector: 'app-carousel-products',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule, MatIcon],
  providers: [ProductService],
  templateUrl: './carousel-products.component.html',
  styleUrl: './carousel-products.component.css'
})

export class CarouselProductsComponent implements OnInit, Product {
  products: Product[] = [];

  responsiveOptions: any[] | undefined;
  carousel: any;
  @Input() products1: Product[] = []; 
  @Output() productAdded = new EventEmitter<Product>();
  
  constructor(private productService: ProductService) {}
  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  imageUrl: string = '';
  category?: string | undefined;
  isAvailable?: string;

  addProductToCart(product: Product): void {
    this.productService.addToCart(product);
  }


  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.products = [
      {
        id: 1,
        name: 'Producto de prueba 1',
        description: 'Descripción del producto de prueba 1',
        price: 100,
        imageUrl: 'https://carrefourar.vtexassets.com/arquivos/ids/197068/7793323004482_02.jpg?v=637523691233030000',
        isAvailable: 'si disponible',
        category: 'Pastas'
      },
      {
        id: 2,
        name: 'Producto de prueba 2',
        description: 'Descripción del producto de prueba 2',
        price: 200,
        imageUrl: 'https://acdn.mitiendanube.com/stores/002/133/760/products/69b38041-330b-4bc3-8527-2ebdd9d3c2d1-9a61b507b31db1191a16600528361378-640-0.jpeg',
        isAvailable: 'no disponible',
        category: 'Mieles'
      },
      {
        id: 3,
        name: 'Producto de prueba 3',
        description: 'Descripción del producto de prueba 3',
        price: 200,
        imageUrl: 'https://acdn.mitiendanube.com/stores/002/133/760/products/69b38041-330b-4bc3-8527-2ebdd9d3c2d1-9a61b507b31db1191a16600528361378-640-0.jpeg',
        isAvailable: 'no disponible',
        category: 'Mieles'
      },
      {
        id: 4,
        name: 'Producto de prueba 4',
        description: 'Descripción del producto de prueba 4',
        price: 200,
        imageUrl: 'https://acdn.mitiendanube.com/stores/002/133/760/products/69b38041-330b-4bc3-8527-2ebdd9d3c2d1-9a61b507b31db1191a16600528361378-640-0.jpeg',
        isAvailable: 'no disponible',
        category: 'Frutos secos'
      }
    ];
    
  }

  
  canNavigateBackward(carousel: any): boolean {
    return carousel.page > 0; // Verifica si hay páginas anteriores
  }
  
  getSeverity(status: string): "success" | "warning" | "danger" | undefined {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined; // O cualquier valor por defecto que prefieras
    }
  }

}
