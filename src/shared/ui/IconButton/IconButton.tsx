
import type { ReactNode } from 'react';
import './IconButton.scss';

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel: string;
}

export const IconButton = ({ children, onClick, ariaLabel }: IconButtonProps) => {
  return (
    <button className="icon-button" onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
};