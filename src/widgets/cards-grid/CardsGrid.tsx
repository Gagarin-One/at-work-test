
import type { ReactNode } from 'react';
import './CardsGrid.scss';

interface CardsGridProps {
  children: ReactNode;
  isEmpty?: boolean;
  emptyMessage?: string;
}

export const CardsGrid = ({ children, isEmpty = false, emptyMessage = 'Нет активных пользователей' }: CardsGridProps) => {
  if (isEmpty) {
    return <div className="cards-grid__empty">{emptyMessage}</div>;
  }

  return <div className="cards-grid">{children}</div>;
};