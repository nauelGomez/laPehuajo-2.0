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
  sanitizeAndCleanImageUrl(url: string | null | undefined): SafeUrl {
    const defaultImage =
      'https://acdn.mitiendanube.com/stores/323/592/products/img-20231012-wa0056-097b4c15c4308e8df1169715166873871-029ec1e6a45de7d7fb16971516780497-640-0.jpg';
  
    if (!url) {
      url = defaultImage;
    } else {
      if (url.startsWith('[') && url.endsWith(']')) {
        url = url.slice(1, -1);
      }
      url = url.replace(/^"|"$/g, '');
    }
  
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  
  

  
  
}

