import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProductService } from '../../services/servicio productos/product.service';
import { RootObject } from '../../services/servicio productos/product.interface';
import { ProductoComponent } from "../../estructura/producto/producto.component";

@Component({
  selector: 'app-carousel-products',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule, ProductoComponent],
  providers: [ProductService],
  templateUrl: './carousel-products.component.html',
  styleUrl: './carousel-products.component.css'
})

export class CarouselProductsComponent implements OnInit {
  products: RootObject[] = [];
  currentIndex: number = 0;
  visibleProducts: number = 4; // Predeterminado para computadoras

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.service.getProductsList().subscribe((data) => {
      console.log('Datos recibidos de la API:', data);
      this.products = data;
    });

    this.adjustVisibleProducts(); // Ajusta el número inicial de productos
  }

  // Detecta el cambio de tamaño de la ventana
  @HostListener('window:resize', [])
  onResize(): void {
    this.adjustVisibleProducts();
  }

  // Ajusta el número de productos visibles según el ancho de la ventana
  private adjustVisibleProducts(): void {
    const screenWidth = window.innerWidth;
    this.visibleProducts = screenWidth < 768 ? 1 : 4; // 1 producto en móviles, 4 en computadoras
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
