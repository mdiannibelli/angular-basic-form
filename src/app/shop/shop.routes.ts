import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/home-page/not-found-page/not-found-page.component';
import { ShopLayoutComponent } from './layouts/shop-layout/shop-layout.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';

export const shopRoutes: Routes = [
  {
    path: '',
    component: ShopLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'shop',
        component: ShopPageComponent,
        children: [],
      },

      {
        path: '**',
        component: NotFoundPageComponent,
      },
    ],
  },
];

export default shopRoutes;
