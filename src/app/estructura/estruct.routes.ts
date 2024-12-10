import { Routes } from '@angular/router';
import { AppCapsuleComponent } from './app-capsule/app-capsule.component';
import { FooterComponent } from './footer/footer.component';
import { ProductoComponent } from './producto/producto.component';
import { CarroComponent } from './carro/carro.component';

export const AUTH_ROUTES: Routes = [
  { path: '', component: AppCapsuleComponent, children: [
    { path: 'footer', component: FooterComponent }]},
    { path: 'producto', component: ProductoComponent},
    { path: 'carro', component: CarroComponent}
  
];

