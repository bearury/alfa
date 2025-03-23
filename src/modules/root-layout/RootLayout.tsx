import { PropsWithChildren, useEffect } from 'react';
import { useProductStore } from '@shared/state/state.ts';

export const RootLayout = ({ children }: PropsWithChildren) => {
  const { isLoading, fetchProducts } = useProductStore((state) => state);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div className="max-w-[980px] mx-auto p-2">{children}</div>;
};
