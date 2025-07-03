import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/auth.routes'),
  },
  {
    path: '',
    loadChildren: () => import('../app/shop/shop.routes'),
  },
  {
    path: '*',
    redirectTo: 'auth',
  },
];
