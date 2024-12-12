import { Routes } from '@angular/router';
import { CarouselProductsComponent } from './carousel-products/carousel-products.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosEsctructComponent } from './productos-esctruct/productos-esctruct.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ProductoViewComponent } from './producto-view/producto-view.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import {  SubirProductoComponent } from './modal-subir-porducto/subir-porducto.component';
import { EliminarProductoComponent } from './eliminar-producto/eliminar-producto.component';


export const AUTH_ROUTES: Routes = [
  
    { path: '', component: InicioComponent, children: [{
      path: 'carousel-products', component: CarouselProductsComponent
    }
    ]},
    { path: 'products-estruct', component: ProductosEsctructComponent },
    { path: 'quienes-somos', component: QuienesSomosComponent },
    { path: 'contacto-form', component: ContactoComponent },
    { path: 'producto-view/:id', component: ProductoViewComponent },
    { path: 'login', component: LoginComponent},
    { path: 'admin-panel', component: AdminPanelComponent},
    {path: 'subir-productos', component: SubirProductoComponent},
    {path: 'eliminar-productos', component: EliminarProductoComponent}
  

  
];

