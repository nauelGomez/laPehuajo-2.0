import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../services/servicio productos/product.interface';
import { CarouselProductsComponent } from '../../paginas/carousel-products/carousel-products.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-app-capsule',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatIconModule, CommonModule, FormsModule, CarouselProductsComponent, RouterLink],
  templateUrl: './app-capsule.component.html',
  styleUrl: './app-capsule.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppCapsuleComponent implements OnInit {
  acc: ((previousValue: Product, currentValue: Product, currentIndex: number, array: Product[]) => Product) | undefined;
  constructor(private renderer: Renderer2) { }
  cartItems: Array<Product & { quantity: number }> = [];
  isCartOpen: boolean = false;
  cartCount: number = 0;
  cartTotal: number = 0;
  postalCode: string = '';


  getProgressPercentage(): number {
    const total = this.calculateTotal();
    return Math.min((total / 1000) * 100, 100);
  }

  calculateShipping(): void {
    if (this.postalCode) {
      console.log('Cálculo de envío para el código postal:', this.postalCode);
    }
  }
  ngOnInit(): void {
    // Inicialización de productos disponibles
    this.cartItems = [
      {
        id: 1,
        name: 'Producto 1',
        description: 'Descripción del producto 1',
        price: 100,
        imageUrl: 'https://acdn.mitiendanube.com/stores/002/133/760/products/69b38041-330b-4bc3-8527-2ebdd9d3c2d1-9a61b507b31db1191a16600528361378-640-0.jpeg',
        category: 'Categoría 1',
        isAvailable: 'Sí',
        quantity: 1,
      },
      {
        id: 2,
        name: 'Producto 2',
        description: 'Descripción del producto 2',
        price: 200,
        imageUrl: 'https://acdn.mitiendanube.com/stores/002/133/760/products/69b38041-330b-4bc3-8527-2ebdd9d3c2d1-9a61b507b31db1191a16600528361378-640-0.jpeg',
        category: 'Categoría 2',
        isAvailable: 'Sí',
        quantity: 1,
      },
    ];
  }

  addToCart(product: Product): void {
    console.log('Producto recibido en AppCapsule:', product); // Debug para verificar recepción

    const existingProduct = this.cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      // Incrementa la cantidad si el producto ya existe
      existingProduct.quantity++;
    } else {
      // Agrega el nuevo producto al carrito
      this.cartItems.push({ ...product, quantity: 1 });
    }

    // Actualiza el contador del carrito
    this.cartCount = this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }



  decreaseQuantity(product: any): void {
    if (product.quantity > 1) {
      product.quantity--;
      this.calculateTotal();
    } else {
      // Añadimos una clase temporal para la animación
      const productIndex = this.cartItems.indexOf(product);
      if (productIndex > -1) {
        const cartTableRows = document.querySelectorAll('.cart-table tbody tr');
        const rowToAnimate = cartTableRows[productIndex] as HTMLElement;
        if (rowToAnimate) {
          rowToAnimate.classList.add('fade-out');
          // Esperamos a que termine la animación para eliminar el producto
          setTimeout(() => {
            this.cartItems.splice(productIndex, 1);
            this.calculateTotal();
          }, 300); // Duración de la animación
        }
      }
    }
  }



  increaseQuantity(product: any): void {
    product.quantity++;
    this.calculateTotal();
  }

  checkout(): void {

    console.log('Compra finalizada:', this.cartItems);
  }
  calculateTotal(): number {
    const total = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    this.cartCount = this.cartItems.reduce((count, item) => count + item.quantity, 0); // Actualiza el contador de productos
    return total;
  }
  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.pageYOffset;

    const topBar = document.querySelector('.top-bar');
    const mainBar = document.querySelector('.main-bar');
    const menuItems = document.querySelector('.menu-items');
    const whatsappIcon = document.querySelector('.whatsapp-float');
    const iconButtons = document.querySelectorAll('.icons button');
    const icons = document.querySelectorAll('.icons ion-icon');

    if (scrollPosition > 50) {
      topBar?.classList.add('hidden');
      mainBar?.classList.add('small');
      menuItems?.classList.add('small');
      whatsappIcon?.classList.add('small-wsp');

      iconButtons.forEach(button => button.classList.add('small-button'));
      icons.forEach(icon => icon.classList.add('small-icon'));
    } else {
      topBar?.classList.remove('hidden');
      mainBar?.classList.remove('small');
      menuItems?.classList.remove('small');
      whatsappIcon?.classList.remove('small-wsp');

      iconButtons.forEach(button => button.classList.remove('small-button'));
      icons.forEach(icon => icon.classList.remove('small-icon'));
    }
  }
}

