
import { useState, useRef, useEffect } from 'react';
import './Dropdown.scss';

interface DropdownProps {
  onEdit: () => void;
  onArchive: () => void;
  onHide: () => void;
  triggerIcon?: () => React.ReactNode;
  onIconClick?: () => void;
}

export const Dropdown = ({ onEdit, onArchive, onHide, triggerIcon, onIconClick }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const handleClick = () => {
    if (onIconClick) onIconClick();
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button 
        className="dropdown__trigger" 
        onClick={handleClick}
        aria-label="Меню"
      >
        {triggerIcon ? triggerIcon() : (
          <svg className="dropdown__icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="6" r="1.5" fill="#595959" />
            <circle cx="12" cy="12" r="1.5" fill="#595959" />
            <circle cx="12" cy="18" r="1.5" fill="#595959" />
          </svg>
        )}
      </button>

      {isOpen && (
        <>
          <div className="dropdown__overlay" onClick={() => setIsOpen(false)} />
          <div className="dropdown__menu dropdown__menu--desktop">
            <button className="dropdown__item" onClick={() => handleAction(onEdit)}>
              <span className="dropdown__item-text">Редактировать</span>
            </button>
            <button className="dropdown__item" onClick={() => handleAction(onArchive)}>
              <span className="dropdown__item-text">Архивировать</span>
            </button>
            <button className="dropdown__item" onClick={() => handleAction(onHide)}>
              <span className="dropdown__item-text">Скрыть</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};