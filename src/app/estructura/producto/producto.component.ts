import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Product } from '../../services/servicio productos/product.interface';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  @Input() productoInfo!: Product;

  constructor(private sanitizer: DomSanitizer) {}

  // Método para sanitizar y limpiar la URL de las imágenes
  sanitizeAndCleanImageUrl(url: string | null | undefined): SafeUrl {
    const defaultImage =
      'https://acdn.mitiendanube.com/stores/323/592/products/img-20231012-wa0056-097b4c15c4308e8df1169715166873871-029ec1e6a45de7d7fb16971516780497-640-0.jpg';

    if (!url) {
      url = defaultImage;
    } else {
      url = url.trim();
    }

    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}

