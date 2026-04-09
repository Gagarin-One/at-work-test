
import './EditSidebarNav.scss';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'profile', label: 'Данные профиля' },
  { id: 'workspace', label: 'Рабочее пространство' },
  { id: 'privacy', label: 'Приватность' },
  { id: 'security', label: 'Безопасность' },
];

interface EditSidebarNavProps {
  activeNav: string;
  onNavChange: (id: string) => void;
}

export const EditSidebarNav = ({ activeNav, onNavChange }: EditSidebarNavProps) => {
  const handleMouseEnter = (id: string) => {
    onNavChange(`${id}-hover`);
  };

  const handleMouseLeave = () => {
    onNavChange('profile');
  };

  return (
    <div className="edit-sidebar-nav">
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`edit-sidebar-nav__item ${
            activeNav === item.id ? 'edit-sidebar-nav__item--active' : ''
          }`}
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={handleMouseLeave}
        >
          <span className="edit-sidebar-nav__text">{item.label}</span>
          <div className="edit-sidebar-nav__line"></div>
        </div>
      ))}
    </div>
  );
};