import { Component, HostListener, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProductService } from '../../services/servicio productos/product.service';
import { Product } from '../../services/servicio productos/product.interface';
import { ProductoComponent } from '../../estructura/producto/producto.component';

@Component({
  selector: 'app-carousel-products',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule, ProductoComponent],
  providers: [ProductService],
  templateUrl: './carousel-products.component.html',
  styleUrls: ['./carousel-products.component.css'],
})
export class CarouselProductsComponent implements OnInit {
  products: Product[] = [];
  currentIndex: number = 0;
  visibleProducts: number = 4; // Predeterminado para computadoras

  constructor(
    private service: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object // Inyecta PLATFORM_ID
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.service.getProductsList(); // Uso de Promesas con async/await
      console.log('Datos recibidos de la API:', data);
      this.products = data;
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
    }

    this.adjustVisibleProducts(); // Ajusta el número inicial de productos
  }

  // Detecta el cambio de tamaño de la ventana solo en el navegador
  @HostListener('window:resize', [])
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.adjustVisibleProducts();
    }
  }

  // Ajusta el número de productos visibles según el ancho de la ventana
  private adjustVisibleProducts(): void {
    if (isPlatformBrowser(this.platformId)) {
      const screenWidth = window.innerWidth;
      this.visibleProducts = screenWidth < 768 ? 1 : 4; // 1 producto en móviles, 4 en computadoras
    }
  }

  // Calcula el desplazamiento del carrusel
  get translateX(): string {
    return `translateX(-${this.currentIndex * (100 / this.visibleProducts)}%)`;
  }

  next(): void {
    if (this.currentIndex < this.products.length - this.visibleProducts) {
      this.currentIndex++;
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
