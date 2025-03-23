import { MouseEvent } from 'react';
import styles from './delete.module.css';

export const DeleteIcon = ({
  onClick,
  color = '#fae8ff'
}: {
  onClick: () => void;
  color?: string;
}) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div className={styles.wrapper} onClick={(e) => handleClick(e)}>
      <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m19.5 4h-14a1.5 1.5 0 0 0 -1.5 1.5v2a.5.5 0 0 0 .5.5h16a.5.5 0 0 0 .5-.5v-2a1.5 1.5 0 0 0 -1.5-1.5z"
          fill={color}
        />
        <path
          d="m16.5 5a.5.5 0 0 1 -.5-.5v-1.25c0-.09-.18-.25-.49-.25h-6c-.33 0-.51.16-.51.25v1.25a.5.5 0 0 1 -1 0v-1.25a1.37 1.37 0 0 1 1.49-1.25h6a1.37 1.37 0 0 1 1.51 1.25v1.25a.5.5 0 0 1 -.5.5z"
          fill={color}
        />
        <path
          d="m20 9v12.5a1.5 1.5 0 0 1 -1.5 1.5h-12a1.5 1.5 0 0 1 -1.5-1.5v-12.5z"
          fill={color}
        />
      </svg>
    </div>
  );
};
