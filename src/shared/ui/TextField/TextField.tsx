
import './TextField.scss';
import { useState, useRef } from 'react';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  size?: 'desktop' | 'mobile';
  placeholder?: string;
  type?: string;
  name?: string;
}

export const TextField = ({
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  size = 'desktop',
  placeholder,
  type = 'text',
  name,
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const clearButtonRef = useRef<HTMLButtonElement>(null);

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('=== CLEAR BUTTON CLICKED ===');
    onChange('');
    // После очистки возвращаем фокус на инпут
    const input = document.getElementById(name);
    if (input) {
      input.focus();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('=== INPUT FOCUS ===');
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Проверяем, не перешел ли фокус на кнопку крестика
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (clearButtonRef.current && clearButtonRef.current === relatedTarget) {
      console.log('Focus moved to clear button, keeping input focused');
      return;
    }
    
    console.log('=== INPUT BLUR ===');
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  // Крестик показывается ТОЛЬКО когда есть значение И инпут в фокусе
  const showClearButton = isFocused && value && value.length > 0;
  console.log('Show clear button:', showClearButton, { isFocused, valueLength: value?.length });

  const showError = error && !isFocused;
  const textColor = value && value.length > 0 ? '#161616' : '#595959';

  return (
    <div className={`text-field text-field--${size} ${showError ? 'text-field--error' : ''}`}>
      <label className="text-field__label" htmlFor={name}>
        {label}
      </label>
      
      <div className="text-field__input-wrapper">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="text-field__input"
          style={{ color: textColor }}
        />
        {showClearButton && (
          <button 
            ref={clearButtonRef}
            onClick={handleClear} 
            className="text-field__clear" 
            type="button"
            aria-label="Очистить поле"
            onMouseDown={(e) => {
              // Предотвращаем потерю фокуса инпутом при клике на кнопку
              e.preventDefault();
            }}
            style={{ 
              position: 'absolute',
              right: '9px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              zIndex: 10
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.0659 8.99469C16.3588 8.70179 16.3588 8.22692 16.0659 7.93403C15.773 7.64113 15.2981 7.64113 15.0052 7.93403L12 10.9392L8.99482 7.93403C8.70192 7.64113 8.22705 7.64113 7.93416 7.93403C7.64126 8.22692 7.64126 8.70179 7.93416 8.99469L10.9394 11.9999L7.93415 15.0051C7.64125 15.298 7.64125 15.7729 7.93415 16.0658C8.22704 16.3586 8.70191 16.3586 8.99481 16.0658L12 13.0605L15.0052 16.0658C15.2981 16.3586 15.773 16.3586 16.0659 16.0658C16.3588 15.7729 16.3588 15.298 16.0659 15.0051L13.0607 11.9999L16.0659 8.99469Z" fill="#595959"/>
            </svg>
          </button>
        )}
      </div>
      
      {showError && <span className="text-field__error">{error}</span>}
    </div>
  );
};