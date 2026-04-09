
import { useState, useRef, useEffect } from 'react';
import './ArchiveDropdown.scss';

interface ArchiveDropdownProps {
  onRestore: () => void;
  triggerIcon?: () => React.ReactNode;
  onIconClick?: () => void;
}

export const ArchiveDropdown = ({ onRestore, triggerIcon, onIconClick }: ArchiveDropdownProps) => {
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

  const handleRestore = () => {
    onRestore();
    setIsOpen(false);
  };

  const handleClick = () => {
    if (onIconClick) onIconClick();
    setIsOpen(!isOpen);
  };

  return (
    <div className="archive-dropdown" ref={dropdownRef}>
      <button 
        className="archive-dropdown__trigger" 
        onClick={handleClick}
        aria-label="Меню"
      >
        {triggerIcon ? triggerIcon() : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="6" r="1.5" fill="#595959" />
            <circle cx="12" cy="12" r="1.5" fill="#595959" />
            <circle cx="12" cy="18" r="1.5" fill="#595959" />
          </svg>
        )}
      </button>

      {isOpen && (
        <>
          <div className="archive-dropdown__overlay" onClick={() => setIsOpen(false)} />
          <div className="archive-dropdown__menu archive-dropdown__menu--desktop">
            <button className="archive-dropdown__item" onClick={handleRestore}>
              <span className="archive-dropdown__item-text">Восстановить</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};