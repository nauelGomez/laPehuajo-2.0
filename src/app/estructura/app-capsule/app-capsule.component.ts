import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RootObject } from '../../services/servicio productos/product.interface';
import { CarouselProductsComponent } from '../../paginas/carousel-products/carousel-products.component';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/servicio carrito/carrito.service';
import { SearchService } from '../../services/servicio search/search.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-app-capsule',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatIconModule, CommonModule, FormsModule, MatInputModule, RouterLink],
  templateUrl: './app-capsule.component.html',
  styleUrl: './app-capsule.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppCapsuleComponent implements OnInit {
  acc: ((previousValue: RootObject, currentValue: RootObject, currentIndex: number, array: RootObject[]) => RootObject) | undefined;
  router: any;
  constructor(private renderer: Renderer2, private carritoService: CarritoService,private sanitizer: DomSanitizer ,private searchService: SearchService) { }
  cartItems: (RootObject & { quantity: number })[] = [];
  isCartOpen: boolean = false;
  isLoading: boolean = true; // Estado de carga
  cartCount: number = 0;
  cartTotal: number = 0;
  postalCode: string = '';
  searchTerm: string = '';
  showSearch: boolean = false;

  onSearch(): void {
    this.searchService.setSearchTerm(this.searchTerm);
  }
  
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
    this.carritoService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.isLoading = false; // Cambia el estado cuando los datos están listos
      this.calculateTotal();
    });
    this.carritoService.getCartItems(); 
    
    
  }

  checkout(): void {
    console.log('Compra finalizada:', this.cartItems);
  }
  calculateTotal(): number {
    const total = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    this.cartCount = this.cartItems.reduce((count, item) => count + item.quantity, 0); 
    return total;
  }
  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }
  increaseQuantity(item: RootObject & { quantity: number }): void {
    item.quantity++;
    this.calculateTotal(); // Actualiza el total después de incrementar
  }
  
  decreaseQuantity(item: RootObject & { quantity: number }): void {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      item.quantity--;
      this.removeFromCart(item.id); // Si la cantidad llega a 0, elimina el producto del carrito
    }
    this.calculateTotal(); // Actualiza el total después de decrementar o eliminar
  }
  updateQuantity(event: { productId: number; quantity: number }): void {
    const product = this.cartItems.find(item => item.id === event.productId);
    if (product) {
      product.quantity = event.quantity;
      this.calculateTotal(); // Recalcular total
    }
  }
  
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.calculateTotal(); // Recalcular total
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

