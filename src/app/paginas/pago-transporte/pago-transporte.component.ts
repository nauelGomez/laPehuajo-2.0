import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, Renderer2 } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CarritoService } from '../../services/servicio carrito/carrito.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SearchService } from '../../services/servicio search/search.service';
import { Product } from '../../services/servicio productos/product.interface';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-pago-transporte',
  standalone: true,
  imports: [MatIcon, NgFor, FormsModule, CommonModule, NgFor],
  templateUrl: './pago-transporte.component.html',
  styleUrls: ['./pago-transporte.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagoTransporteComponent {
  cartItems: (Product & { quantity: number })[] = [];
  isLoading: boolean = true;
  postalCode: string = '';
  showSearch: boolean = false;
  selectedOption: string = ''; 
  email: string = '';

  shippingCost: number = 9767.99;

  address = {
    name: '',
    lastname: '',
    phone: '',
    postalCode: '',
    street: '',
    number: '',
    city: ''
  };

  showAddressForm: boolean = false;
  showAddressForm1: boolean = false;

  constructor(private renderer: Renderer2, private carritoService: CarritoService, private sanitizer: DomSanitizer, private searchService: SearchService) {}

  ngOnInit(): void {
    this.carritoService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.isLoading = false; // Cambia el estado cuando los datos están listos
      this.calculateTotal();
    });

    if (!this.cartItems.length) {
      this.carritoService.getCartItems();
    }
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.shippingCost;
  }

  updateQuantity(event: { productId: string; quantity: number }): void {
    const product = this.cartItems.find(item => item.id === event.productId);
    if (product) {
      product.quantity = event.quantity;
      this.calculateTotal();
    }
  }
  getCategoryNames(categories: { name: string }[] | undefined): string {
    return categories?.map(c => c.name).join(', ') || 'Sin categoría';
  }
  openAddressForm(): void {
    this.showAddressForm = true;
  }

  openAddressForm1(): void {
    this.showAddressForm1 = true;
  }

  closeAddressForm(): void {
    this.showAddressForm = false;
  }

  closeAddressForm1(): void {
    this.showAddressForm1 = false;
  }

  saveAddress(): void {
    console.log('Dirección guardada:', this.address);
    this.closeAddressForm();
  }

  saveAddress1(): void {
    console.log('Dirección guardada:', this.address);
    this.closeAddressForm1();
  }

  calculateShipping(): void {
    if (this.postalCode) {
      console.log('Cálculo de envío para el código postal:', this.postalCode);
    }
  }

  sanitizeImageUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  sanitizeAndCleanImageUrl(url: string): SafeUrl {
    if (url.startsWith('[') && url.endsWith(']')) {
      url = url.slice(1, -1);
    }
    url = url.replace(/^"|"$/g, '');
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}