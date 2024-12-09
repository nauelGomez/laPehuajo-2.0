import { Routes } from '@angular/router';
import { ProductService } from './servicio productos/product.service';
import { CarritoService } from './servicio carrito/carrito.service';

export const AUTH_ROUTES: Routes = [
  { path: '', component: ProductService },
  { path: 'carrito-service', component: CarritoService }
];

