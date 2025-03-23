import { FieldPath, RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { FormInputs } from '@shared/types/form.type.ts';

export const InputField = ({
  name,
  register,
  options,
  errorMessage,
  type = 'text'
}: {
  name: FieldPath<FormInputs>;
  errorMessage: string[];
  type?: string;
  options:
    | RegisterOptions<FormInputs, 'name' | 'price' | 'description' | 'brand' | 'sku'>
    | undefined;
  register: (
    name: FieldPath<FormInputs>,
    options?: RegisterOptions<FormInputs, FieldPath<FormInputs>>
  ) => UseFormRegisterReturn<FieldPath<FormInputs>>;
}) => {
  return (
    <label htmlFor={name} className="flex flex-col gap-1">
      <span className="capitalize">{name}</span>
      <input
        type={type}
        id={name}
        {...register(name, options)}
        className="bg-inherit border border-b-blue-200 rounded py-1 px-2"
      />
      {errorMessage.map((m, i) => (
        <span key={i} className="text-xs text-red-400">
          {m}
        </span>
      ))}
    </label>
  );
};
