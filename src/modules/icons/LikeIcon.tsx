import { MouseEvent } from 'react';
import styles from './like.module.css';

export const LikeIcon = ({ active, onClick }: { active: boolean; onClick: () => void }) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div className={styles.wrapper} onClick={(e) => handleClick(e)}>
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m27.8125 5.5842c-3.1411-3.1411-8.2339-3.1411-11.375 0l-.4375.4375-.4375-.4375c-3.1411-3.1411-8.2339-3.1411-11.375 0s-3.1411 8.2339 0 11.375l.4375.4375 11.375 11.375 11.375-11.375.4375-.4375c3.1411-3.1411 3.1411-8.2339 0-11.375z"
          stroke="#fae8ff"
          strokeWidth="3"
          fill={active ? '#fae8ff' : 'none'}
        ></path>
      </svg>
    </div>
  );
};
