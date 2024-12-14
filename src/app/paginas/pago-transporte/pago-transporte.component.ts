import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, Renderer2 } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CarritoService } from '../../services/servicio carrito/carrito.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SearchService } from '../../services/servicio search/search.service';
import { RootObject } from '../../services/servicio productos/product.interface';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-pago-transporte',
  standalone: true,
  imports: [MatIcon, NgFor, FormsModule, CommonModule, NgFor],
  templateUrl: './pago-transporte.component.html',
  styleUrl: './pago-transporte.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagoTransporteComponent {
  acc: ((previousValue: RootObject, currentValue: RootObject, currentIndex: number, array: RootObject[]) => RootObject) | undefined;
    router: any;
    cartItems: (RootObject & { quantity: number })[] = [];
    isLoading: boolean = true;
    postalCode: string = '';
    showSearch: boolean = false;
    selectedOption: string = ''; 
    email: string = '';
    constructor( private renderer: Renderer2, private carritoService: CarritoService,private sanitizer: DomSanitizer ,private searchService: SearchService) { }
  
    
showAddressForm: boolean = false;
showAddressForm1: boolean = false;
address = {
  name: '',
  lastname: '',
  phone: '',
  postalCode: '',
  street: '',
  number: '',
  city: ''
};

// Abre el formulario de dirección
openAddressForm(): void {
  this.showAddressForm = true;
}
openAddressForm1(): void {
  this.showAddressForm1 = true;
}
closeAddressForm(): void {
  this.showAddressForm = false;
}
closeAddressForm1(){
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
  ngOnInit(): void {
    this.carritoService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.isLoading = false; // Cambia el estado cuando los datos están listos
      this.calculateTotal();
    });
  
    // Asegúrate de que esta línea no reinicie los datos si ya están disponibles
    if (!this.cartItems.length) {
      this.carritoService.getCartItems();
    }
  }
  

  shippingCost: number = 9767.99;

calculateSubtotal(): number {
  return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

calculateTotal(): number {
  return this.calculateSubtotal() + this.shippingCost;
}



  updateQuantity(event: { productId: number; quantity: number }): void {
    const product = this.cartItems.find(item => item.id === event.productId);
    if (product) {
      product.quantity = event.quantity;
      this.calculateTotal(); // Recalcular total
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
