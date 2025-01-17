import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/servicio productos/product.service';
import { Product } from '../../services/servicio productos/product.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/servicio carrito/carrito.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-producto-view',
  standalone: true,
  templateUrl: './producto-view.component.html',
  styleUrls: ['./producto-view.component.css'],
  imports: [
    CommonModule, // Necesario para directivas básicas como *ngIf y *ngFor
    FormsModule, // Agregar FormsModule para habilitar [(ngModel)]
  ],
})
export class ProductoViewComponent implements OnInit {
  product!: Product;
  quantity: number = 1;
  mainImage: string = '';
  currentIndex: number = 0;
  isAnimating: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private carritoService: CarritoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Capturar el ID desde la URL
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('ID Capturado:', productId); // Verificar el ID en la consola
    if (productId) {
      this.loadProduct(productId); // Pasar el ID como string
    } else {
      console.error('No se encontró el ID en la URL');
    }
  }

  async loadProduct(id: string): Promise<void> {
    try {
      const data: Product = await this.productService.getProductById(id); // Cambiado a método basado en Promesas
      this.product = data;
      this.mainImage = this.product.images[0]; // Inicializar la imagen principal
    } catch (err) {
      console.error('Error al obtener el producto:', err);
    }
  }

  changeMainImage(image: string): void {
    this.mainImage = image;
  }

  // Incrementar cantidad
  incrementQuantity(): void {
    this.quantity++;
  }

  // Decrementar cantidad
  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Acción de agregar al carrito
  addToCart(): void {
    this.carritoService.addToCart(this.product, this.quantity);
    console.log(`Producto agregado al carrito: ${this.product.name}, cantidad: ${this.quantity}`);
  }

  onThumbnailClick(index: number): void {
    if (this.currentIndex !== index) {
      this.isAnimating = true; // Activa la animación
      this.currentIndex = index; // Actualiza el índice actual
      setTimeout(() => {
        this.mainImage = this.product.images[index]; // Cambia la imagen después de un pequeño delay
        this.isAnimating = false; // Desactiva la animación después de completarla
      }, 300); // Tiempo igual al de la animación CSS
    }
  }

  onAnimationEnd(): void {
    this.isAnimating = false; // Detenemos la animación al finalizar
  }

  sanitizeImageUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  sanitizeAndCleanImageUrl(url: string): SafeUrl {
    if (url.startsWith('[') && url.endsWith(']')) {
      url = url.slice(1, -1); // Elimina corchetes
    }
    // Elimina las comillas dobles extra si existen
    url = url.replace(/^"|"$/g, ''); // Elimina comillas al inicio y al final
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
