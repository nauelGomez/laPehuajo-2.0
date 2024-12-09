import { Routes } from '@angular/router';
import { CarouselProductsComponent } from './carousel-products/carousel-products.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosEsctructComponent } from './productos-esctruct/productos-esctruct.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ProductoComponent } from '../estructura/producto/producto.component';
import { ProductoViewComponent } from './producto-view/producto-view.component';

export const AUTH_ROUTES: Routes = [
  
    { path: '', component: InicioComponent, children: [{
      path: 'carousel-products', component: CarouselProductsComponent
    }
    ]},
    { path: 'products-estruct', component: ProductosEsctructComponent },
    { path: 'quienes-somos', component: QuienesSomosComponent },
    { path: 'contacto-form', component: ContactoComponent },
    { path: 'producto-view/:id', component: ProductoViewComponent }
  
];

