
import { useState, useEffect } from 'react';
import { Button } from '../Button/Button';

interface ResponsiveButtonProps {
  text: string;
  state?: 'default' | 'hover';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export const ResponsiveButton = (props: ResponsiveButtonProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return <Button {...props} size={isMobile ? 'mobile' : 'desktop'} />;
};