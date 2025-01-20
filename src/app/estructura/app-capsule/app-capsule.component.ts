import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, Product } from '../../services/servicio productos/product.interface';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/servicio carrito/carrito.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { SearchService } from '../../services/servicio search/search.service';

@Component({
  selector: 'app-app-capsule',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatIconModule, CommonModule, FormsModule, MatInputModule, RouterLink],
  templateUrl: './app-capsule.component.html',
  styleUrls: ['./app-capsule.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppCapsuleComponent implements OnInit {
  cartItems: (Product & { quantity: number })[] = [];
  isCartOpen: boolean = false;
  isLoading: boolean = true;
  cartCount: number = 0;
  cartTotal: number = 0;
  postalCode: string = '';
  searchTerm: string = '';
  filteredProducts: Product[] = [];
  products: Product[] = [];
  
  constructor(
    private renderer: Renderer2,
    private carritoService: CarritoService,
    private sanitizer: DomSanitizer,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.carritoService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.cartCount = items.reduce((count, item) => count + item.quantity, 0);
      this.cartTotal = this.carritoService.calculateTotal();
      this.isLoading = false;
    });
  }
  
  sendToWhatsApp(): void {
    if (this.cartItems.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de enviar el pedido.');
      return;
    }
  
    const phoneNumber = '1234567890'; // Cambia este número por el de tu negocio.
    const encodedProducts = this.cartItems
      .map(
        (item) =>
          `- ${item.name} (x${item.quantity}): ${item.price * item.quantity} ARS`
      )
      .join('%0A'); // %0A es el código para un salto de línea en la URL.
  
    const total = this.calculateTotal();
    const message = `¡Hola! Quiero hacer un pedido:%0A%0A${encodedProducts}%0A%0A*Total (sin envío): ${total} ARS*`;
  
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    this.carritoService.clearCart();
  }
  
  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }
  getProgressPercentage(): number {
    const total = this.calculateTotal();
    return Math.min((total / 1000) * 100, 100);
  }
  getCategoryNames(categories: Category[] | undefined): string {
    if (!categories || categories.length === 0) {
      return 'Sin categoría';
    }
    return categories.map(category => category.name).join(', ');
  }
  onSearch(): void {
    this.searchService.setSearchTerm(this.searchTerm);
  }

  sanitizeImageUrl(url: string | null | undefined): SafeUrl {
    if (!url) {
      url = 'https://example.com/default-image.jpg';
    }
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  increaseQuantity(item: Product & { quantity: number }): void {
    item.quantity++;
    this.carritoService.addToCart(item, 0);
  }

  decreaseQuantity(item: Product & { quantity: number }): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.carritoService.addToCart(item, 0);
    } else {
      this.removeFromCart(item.id);
    }
  }

  removeFromCart(productId: string): void {
    this.carritoService.removeFromCart(productId); // Mueve la lógica al servicio
    this.cartTotal = this.carritoService.calculateTotal(); // Actualiza el total
  }
  calculateTotal(): number {
    const total = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    this.cartCount = this.cartItems.reduce((count, item) => count + item.quantity, 0); 
    return total;
  }

  calculateShipping(): void {
    if (this.postalCode) {
      console.log('Calculando envío para:', this.postalCode);
    }
  }

  checkout(): void {
    console.log('Compra finalizada:', this.cartItems);
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
  sanitizeAndCleanImageUrl(url: string): SafeUrl {
    if (url.startsWith('[') && url.endsWith(']')) {
      url = url.slice(1, -1); // Elimina corchetes
    }
    // Elimina las comillas dobles extra si existen
    url = url.replace(/^"|"$/g, ''); // Elimina comillas al inicio y al final
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  
}
