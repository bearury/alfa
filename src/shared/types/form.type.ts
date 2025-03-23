import { Product } from '@shared/interfaces/products-interface.ts';

export type FormInputs = Omit<Product, 'id' | 'isLike' | 'rating' | 'poster'>;
