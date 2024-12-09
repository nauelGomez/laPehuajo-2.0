import { Routes } from '@angular/router';
import { ProductService } from './servicio productos/product.service';

export const AUTH_ROUTES: Routes = [
  { path: '', component: ProductService }
];

