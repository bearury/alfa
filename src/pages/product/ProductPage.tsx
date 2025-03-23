import { useNavigate, useParams } from 'react-router';
import { useProductStore } from '@shared/state/state.ts';
import { useEffect, useState } from 'react';
import { Product } from '@shared/interfaces/products-interface.ts';

export const ProductPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { allProducts, getProductById } = useProductStore();

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (params.id) {
      const product = getProductById(Number(params.id));
      if (product) {
        setProduct(product);
      }
    }
  }, [getProductById, params.id, allProducts]);

  if (!product) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} className="px-4 py-1 border border-b-blue-200 rounded">
        Back
      </button>

      <div className="mt-4 flex flex-row justify-between border gap-12 border-teal-200 rounded px-6 py-2">
        <div className="flex flex-col w-2/3 flex-shrink-0 gap-6 justify-between">
          <div>
            <h2>{product.name}</h2>
            <h3 className="font-extrabold">{product.brand}</h3>
            <p className=" mt-5 text-sm">Description: {product.description}</p>
            <p className="opacity-30 mt-2">Rating: {product.rating}</p>
          </div>

          <div className="flex flex-row gap-12 items-end">
            <span className="italic">Price: {product.price}</span>
            <span className="font-light text-xs">Sku: {product.sku}</span>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden h-[250px]">
          <img src={product.poster} alt="poster" className="h-full w-auto object-contain" />
        </div>
      </div>
    </div>
  );
};
