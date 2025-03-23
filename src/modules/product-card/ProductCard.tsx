import { Product } from '@shared/interfaces/products-interface.ts';
import { LikeIcon } from '../icons/LikeIcon.tsx';
import { useProductStore } from '@shared/state/state.ts';
import { DeleteIcon } from '../icons/DeleteIcon.tsx';
import { useNavigate } from 'react-router';
import { EditIcon } from '../icons/EditIcon.tsx';

export const ProductCard = ({ product }: { product: Product }) => {
  const { selectLike, deleteProduct } = useProductStore();

  const navigate = useNavigate();

  const handleIsLike = (id: number) => {
    selectLike(id);
  };

  const handleClickInCard = () => {
    navigate('/products/' + product.id);
  };

  const handleClickEditCard = () => {
    navigate('/update-product/' + product.id);
  };

  return (
    <div
      className="w-[450px] border border-teal-200 rounded-lg shadow-xl flex flex-row justify-between gap-4 p-4 cursor-pointer hover:shadow-teal-200/20 transition-all"
      onClick={handleClickInCard}
    >
      <div className="flex flex-col gap-4 justify-between w-1/2">
        <div className="flex flex-row gap-2 justify-between">
          <div className="font-bold flex-1"> {product.name} </div>
          <LikeIcon active={product.isLike} onClick={() => handleIsLike(product.id)} />
        </div>
        <div className="flex flex-row gap-2 items-center justify-between">
          <span className="italic">Price: {product.price}</span>

          <div className="flex flex-row gap-1">
            <EditIcon onClick={handleClickEditCard} />
            <DeleteIcon onClick={() => deleteProduct(product.id)} />
          </div>
        </div>
      </div>
      <div className="w-32 h-32">
        <img src={product.poster} alt="poster" />
      </div>
    </div>
  );
};
