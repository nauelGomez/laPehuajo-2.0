import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/servicio productos/product.service';
import { RootObject } from '../../services/servicio productos/product.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto-view',
  standalone: true,
  templateUrl: './producto-view.component.html',
  styleUrls: ['./producto-view.component.css'],
  imports: [
    CommonModule, // Necesario para directivas básicas como *ngIf y *ngFor
    FormsModule   // Agregar FormsModule para habilitar [(ngModel)]
  ]
})
export class ProductoViewComponent implements OnInit {
  product!: RootObject;
  quantity: number = 1;
  mainImage: string = '';
  currentIndex: number = 0;
  isAnimating: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Capturar el ID desde la URL
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('ID Capturado:', productId); // Verificar el ID en la consola
    if (productId) {
      this.loadProduct(+productId); // Convertir a número y cargar el producto
    } else {
      console.error('No se encontró el ID en la URL');
    }
  }

  // Cargar el producto usando el servicio
  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.mainImage = this.product.images[0]; // Inicializar la imagen principal
      },
      error: (err) => console.error('Error al obtener el producto:', err),
    });
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
    console.log(`Producto agregado al carrito: ${this.product.title}, cantidad: ${this.quantity}`);
  }

  onThumbnailClick(index: number): void {
    this.currentIndex = index;
    this.mainImage = this.product.images[index]; // Cambiar la imagen principal
  }
  onAnimationEnd(): void {
    this.isAnimating = false; // Detenemos la animación al finalizar
  }
}
