import { Component, Input, output } from '@angular/core';
import { RootObject } from '../../services/servicio productos/product.interface';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  @Input() productoInfo!: RootObject;

  
}

