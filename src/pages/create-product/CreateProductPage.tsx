import { useNavigate } from 'react-router';
import { SubmitHandler } from 'react-hook-form';
import { FormInputs } from '@shared/types/form.type.ts';
import { useProductStore } from '@shared/state/state.ts';
import { Form } from '@shared/components/Form.tsx';

export const CreateProductPage = () => {
  const navigate = useNavigate();
  const { addProduct } = useProductStore();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    addProduct(data);
  };

  return (
    <div className="flex flex-col justify-start gap-4">
      <div className="flex flex-row gap-2">
        <button onClick={() => navigate(-1)} className="px-4 py-1 border border-b-blue-200 rounded">
          Back
        </button>
      </div>

      <Form onSubmit={onSubmit} />
    </div>
  );
};
