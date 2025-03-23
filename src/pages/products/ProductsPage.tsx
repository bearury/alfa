import { useProductStore } from '@shared/state/state.ts';
import { ProductCard } from '../../modules/product-card/ProductCard.tsx';
import { Pagination } from '../../modules/pagination/Pagination.tsx';
import { Link } from 'react-router';
import { Routes } from '@shared/enums/routes.ts';
import { ChangeEvent, useEffect, useState } from 'react';

export const ProductsPage = () => {
  const {
    products,
    error,
    skip,
    totalProducts,
    filterProduct,
    isFilterMode,
    changeSearchValue,
    searchValue
  } = useProductStore((state) => state);

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    changeSearchValue(value);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-start gap-4">
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-row gap-2">
          <button onClick={filterProduct} className="px-4 py-1 border border-b-blue-200 rounded">
            {isFilterMode ? 'Switch off filtering' : 'Filter Like'}
          </button>

          <Link to={Routes.CREATE_PRODUCT}>
            <button className="px-4 py-1 border border-blue-200 rounded">Create product</button>
          </Link>
        </div>

        <input
          value={inputValue}
          onChange={handleChangeInput}
          className="bg-inherit h-8 border border-blue-200 rounded px-4"
          placeholder="Enter to search..."
        />
      </div>

      {products.length ? (
        <div className="flex flex-row gap-4 flex-wrap justify-start">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <span>Products not found</span>
      )}
      <div className="self-center">{totalProducts > skip && <Pagination />}</div>
    </div>
  );
};
