import { InputField } from '@shared/components/InputField.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInputs } from '@shared/types/form.type.ts';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Routes } from '@shared/enums/routes.ts';

export const Form = ({
  onSubmit,
  data
}: {
  onSubmit: (data: FormInputs) => void;
  data?: FormInputs;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FormInputs>();

  const location = useLocation();

  const [isCreateRoute, setIsCreateRoute] = useState(false);

  const submit: SubmitHandler<FormInputs> = (data) => {
    onSubmit(data);
    reset();
  };

  useEffect(() => {
    if (location.pathname === Routes.CREATE_PRODUCT) {
      setIsCreateRoute(true);
    }

    if (data) {
      setValue('name', data.name, { shouldValidate: true });
      setValue('description', data.description, { shouldValidate: true });
      setValue('brand', data.brand, { shouldValidate: true });
      setValue('price', data.price, { shouldValidate: true });
      setValue('sku', data.sku, { shouldValidate: true });
    }
  }, [data, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-4 border border-b-blue-200 rounded py-4 px-8 w-96 self-center"
    >
      <h2 className="text-2xl font-extrabold self-center py-1">
        {isCreateRoute ? 'Create product' : 'Update product'}
      </h2>
      <InputField
        name="name"
        errorMessage={[
          errors.name?.type === 'required' ? 'This field is required' : '',
          errors.name?.type === 'minLength' ? 'Less than three characters' : ''
        ]}
        options={{
          required: true,
          minLength: 3
        }}
        register={register}
      />

      <InputField
        name="brand"
        errorMessage={[errors.brand?.type === 'required' ? 'This field is required' : '']}
        options={{ required: true }}
        register={register}
      />

      <InputField
        name="description"
        errorMessage={[errors.description?.type === 'required' ? 'This field is required' : '']}
        options={{ required: true }}
        register={register}
      />

      <InputField
        name="price"
        errorMessage={[
          errors.price?.type === 'required' ? 'This field is required' : '',
          errors.price?.message ? errors.price.message : ''
        ]}
        options={{
          required: true,
          pattern: {
            value: /^\d+(\.\d{1,2})?$/,
            message: 'Incorrect value. Use the format 9.99'
          }
        }}
        register={register}
      />

      <InputField
        name="sku"
        errorMessage={[errors.sku ? 'This field is required' : '']}
        options={{
          required: true
        }}
        register={register}
      />

      <input
        type="submit"
        className="py-1 px-4 border border-b-blue-200 cursor-pointer uppercase"
        value={isCreateRoute ? 'Create' : 'Update'}
      />
    </form>
  );
};
