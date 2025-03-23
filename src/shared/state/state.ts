import { create } from 'zustand/react';
import { ProductResponseDto } from '@shared/dto/product-dto.ts';
import { State } from '@shared/interfaces/state-interface.ts';
import { Product } from '@shared/interfaces/products-interface.ts';
import { FormInputs } from '@shared/types/form.type.ts';

export const useProductStore = create<State>((set, getState) => ({
  allProducts: [] as Product[],
  products: [] as Product[],
  searchValue: '',
  isFilterMode: false,
  isLoading: false,
  error: '',
  currentPage: 1,
  skip: 10,
  totalProducts: 0,

  fetchProducts: async (): Promise<void> => {
    set({ isLoading: true });
    const response = await fetch('https://dummyjson.com/products?limit=100');
    set({ isLoading: false });

    if (!response.ok) {
      set({ error: response.statusText, products: [] });
      return;
    }

    set({ error: '' });
    const data: ProductResponseDto = await response.json();

    const products: Product[] = data.products.map((p) => ({
      id: p.id,
      name: p.title,
      poster: p.thumbnail,
      price: p.price,
      brand: p.brand,
      description: p.description,
      sku: p.sku,
      rating: p.rating,
      isLike: false
    }));

    set({ allProducts: products });
    getState().filterAndSetProducts();
  },

  getProductById: (id: number) => {
    return getState().allProducts.find((product) => product.id === id);
  },

  changePage: (currentPage: number) => {
    set({ currentPage });
    getState().filterAndSetProducts();
  },

  changeSearchValue: (value: string) => {
    set({ searchValue: value });
    getState().filterAndSetProducts();
  },

  filterProduct: () => {
    set((state) => {
      const isFilterMode = !state.isFilterMode;
      return {
        isFilterMode
      };
    });

    getState().filterAndSetProducts();
  },

  selectLike: (id: number) => {
    set((state) => {
      const modifyProducts = state.allProducts.map((p) =>
        p.id === id ? { ...p, isLike: !p.isLike } : p
      );

      return {
        allProducts: modifyProducts
      };
    });

    getState().filterAndSetProducts();
  },

  addProduct: (product: FormInputs) => {
    set((state) => {
      const newProduct: Product = {
        ...product,
        id: new Date().getTime(),
        poster: 'https://stpos.ru/upload/medialibrary/7e0/7e0bf55f0bb6b95c475e4b38befecb06.png',
        rating: 0,
        isLike: false
      };
      const newProducts = [...state.allProducts, newProduct];
      return {
        allProducts: newProducts
      };
    });
    getState().filterAndSetProducts();
  },

  updateProduct: async ({
    id,
    product
  }: {
    id: number;
    product: FormInputs;
  }): Promise<{ status: string }> => {
    set((state) => {
      const modifyProducts = state.allProducts.map((p) => {
        if (p.id === id) {
          return {
            id: p.id,
            name: product.name,
            description: product.description,
            sku: product.sku,
            rating: p.rating,
            isLike: p.isLike,
            poster: p.poster,
            brand: product.brand,
            price: product.price
          } as Product;
        }
        return p;
      });
      return {
        allProducts: modifyProducts
      };
    });
    getState().filterAndSetProducts();
    return { status: 'Ok' };
  },

  deleteProduct: (id: number) => {
    set((state) => {
      const modifyProducts = state.allProducts.filter((p) => p.id !== id);
      return {
        allProducts: modifyProducts
      };
    });

    getState().filterAndSetProducts();
  },

  filterAndSetProducts: () => {
    const state = getState();
    const { searchValue, isFilterMode, allProducts, currentPage, skip } = state;

    const filteredProducts = allProducts.filter((product) => {
      const isMatch = product.name.toLowerCase().includes(searchValue.toLowerCase());
      return isFilterMode ? product.isLike && isMatch : isMatch;
    });

    const numberOfPages = Math.ceil(filteredProducts.length / skip);

    const newCurrentPage =
      numberOfPages < currentPage ? (!numberOfPages ? 1 : numberOfPages) : currentPage;

    const paginatedProducts = filteredProducts.slice(
      (newCurrentPage - 1) * skip,
      newCurrentPage * skip
    );

    set({
      products: paginatedProducts,
      totalProducts: filteredProducts.length,
      currentPage: newCurrentPage
    });
  }
}));
