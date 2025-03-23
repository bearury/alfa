import { Router } from '@shared/interfaces/router-interface.ts';
import { Routes } from '@shared/enums/routes.ts';
import {
  CreateProductPage,
  NotFoundPage,
  ProductPage,
  ProductsPage,
  UpdateProductPage
} from '@pages/index';

export const routes: Router[] = [
  {
    path: Routes.PRODUCTS,
    Component: ProductsPage
  },
  {
    path: Routes.PRODUCTS_ID,
    Component: ProductPage
  },
  {
    path: Routes.CREATE_PRODUCT,
    Component: CreateProductPage
  },
  {
    path: Routes.UPDATE_PRODUCT,
    Component: UpdateProductPage
  },
  {
    path: Routes.NOT_FOUND,
    Component: NotFoundPage
  }
];
