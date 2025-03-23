import { useNavigate, useParams } from 'react-router';
import { SubmitHandler } from 'react-hook-form';
import { FormInputs } from '@shared/types/form.type.ts';
import { useProductStore } from '@shared/state/state.ts';
import { Form } from '@shared/components/Form.tsx';
import { useEffect, useState } from 'react';
import { Product } from '@shared/interfaces/products-interface.ts';

export const UpdateProductPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState<Product>();

  const { allProducts, updateProduct, getProductById } = useProductStore();

  useEffect(() => {
    if (params.id) {
      const product = getProductById(Number(params.id));
      if (product) {
        setProduct(product);
      }
    }
  }, [allProducts, getProductById, params.id]);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (product) {
      updateProduct({ id: product.id, product: data }).then((res) => {
        if (res.status === 'Ok') {
          navigate('/products');
        }
      });
    }
  };

  return (
    <div className="flex flex-col justify-start gap-4">
      <div className="flex flex-row gap-2">
        <button onClick={() => navigate(-1)} className="px-4 py-1 border border-b-blue-200 rounded">
          Back
        </button>
      </div>

      <Form onSubmit={onSubmit} data={product} />
    </div>
  );
};
