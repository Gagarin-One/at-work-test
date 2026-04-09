
interface UserMenuIconProps {
  color?: string;
  type?: 'desktop' | 'mobile';
  state?: 'default' | 'hover' | 'active';
}

export const UserMenuIcon = ({ color = '#161616', type = 'desktop', state = 'default' }: UserMenuIconProps) => {
  // Для десктопа
  if (type === 'desktop') {
    let fillColor = '#161616';
    if (state === 'hover') fillColor = '#22A0BC';
    if (state === 'active') fillColor = '#595959';
    
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_user_menu)">
          <path d="M10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16C10.9 16 10 16.9 10 18ZM10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6ZM10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12Z" fill={fillColor}/>
        </g>
        <defs>
          <clipPath id="clip0_user_menu">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    );
  }
  
  // Для мобилки
  let fillColor = '#161616';
  if (state === 'active') fillColor = '#595959';
  
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_user_menu_mobile)">
        <path d="M11 14.75C11 15.4375 11.5625 16 12.25 16C12.9375 16 13.5 15.4375 13.5 14.75C13.5 14.0625 12.9375 13.5 12.25 13.5C11.5625 13.5 11 14.0625 11 14.75ZM11 7.25C11 7.9375 11.5625 8.5 12.25 8.5C12.9375 8.5 13.5 7.9375 13.5 7.25C13.5 6.5625 12.9375 6 12.25 6C11.5625 6 11 6.5625 11 7.25ZM11 11C11 11.6875 11.5625 12.25 12.25 12.25C12.9375 12.25 13.5 11.6875 13.5 11C13.5 10.3125 12.9375 9.75 12.25 9.75C11.5625 9.75 11 10.3125 11 11Z" fill={fillColor}/>
      </g>
      <defs>
        <clipPath id="clip0_user_menu_mobile">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};