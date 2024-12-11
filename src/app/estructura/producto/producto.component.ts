import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { RootObject } from '../../services/servicio productos/product.interface';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  @Input() productoInfo!: RootObject;
  constructor(private sanitizer: DomSanitizer) {}

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

