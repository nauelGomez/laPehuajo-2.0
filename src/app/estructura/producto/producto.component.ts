import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { RootObject } from '../../services/servicio productos/product.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  @Input() productoInfo!: RootObject;


  
}

