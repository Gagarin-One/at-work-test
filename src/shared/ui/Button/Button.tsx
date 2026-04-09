
import './Button.scss';

interface ButtonProps {
  text: string;
  size?: 'desktop' | 'mobile';
  state?: 'default' | 'hover';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export const Button = ({ 
  text, 
  size = 'desktop', 
  state = 'default', 
  onClick,
  type = 'button',
  disabled = false,
  className 
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`button button--${size} button--${state} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="button__text">{text}</span>
    </button>
  );
};