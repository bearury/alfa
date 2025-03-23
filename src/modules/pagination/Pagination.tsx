import { useProductStore } from '@shared/state/state.ts';

export const Pagination = () => {
  const { currentPage, totalProducts, skip, changePage } = useProductStore((state) => state);

  return (
    <div className="flex flex-row gap-2">
      {Array.from({ length: Math.ceil(totalProducts / skip) }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => changePage(index + 1)}
          className={`p-1 border border-blue-200
          rounded flex items-center justify-center text-xs w-6 h-6 ${currentPage === index + 1 ? 'bg-blue-200 text-gray-800 bold' : ''}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
