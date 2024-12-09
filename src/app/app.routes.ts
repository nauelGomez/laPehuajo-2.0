import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./paginas/paginas.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./estructura/estruct.routes').then(m => m.AUTH_ROUTES)
  }
];
