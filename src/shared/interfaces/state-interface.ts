import { Product } from '@shared/interfaces/products-interface.ts';
import { FormInputs } from '@shared/types/form.type.ts';

export interface State {
  products: Product[];
  allProducts: Product[];
  searchValue: string;
  isLoading: boolean;
  isFilterMode: boolean;
  error: string;
  currentPage: number;
  skip: number;
  totalProducts: number;
  getProductById: (id: number) => Product | undefined;
  fetchProducts: () => Promise<void>;
  changePage: (page: number) => void;
  selectLike: (id: number) => void;
  changeSearchValue: (searchValue: string) => void;
  filterProduct: () => void;
  addProduct: (product: FormInputs) => void;
  updateProduct: ({
    id,
    product
  }: {
    id: number;
    product: FormInputs;
  }) => Promise<{ status: string }>;
  deleteProduct: (id: number) => void;
  filterAndSetProducts: () => void;
}
