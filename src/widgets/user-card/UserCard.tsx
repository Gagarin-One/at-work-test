
import type { UserWithStatus } from '../../entities/user/model/types';
import { Dropdown } from '../../shared/ui/Dropdown/Dropdown';
import { ArchiveDropdown } from '../../shared/ui/Dropdown/ArchiveDropdown';
import { UserMenuIcon } from '../../shared/ui/Icons/UserMenuIcon';
import { useMobile } from '../../shared/hooks/useMobile';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './UserCard.scss';

interface UserCardProps {
  user: UserWithStatus;
  onArchive?: () => void;
  onHide?: () => void;
  onRestore?: () => void;
}

export const UserCard = ({ user, onArchive, onHide, onRestore }: UserCardProps) => {
  const navigate = useNavigate();
  const isArchived = user.status === 'archived';
  const isMobile = useMobile();
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [isIconActive, setIsIconActive] = useState(false);
  
  const avatarUrl = `https://i.pravatar.cc/150?img=${user.id}`;

  const handleEdit = () => {
    navigate(`/edit/${user.id}`);
  };

  const handleArchive = () => {
    if (onArchive) onArchive();
  };

  const handleHide = () => {
    if (onHide) onHide();
  };

  const handleRestore = () => {
    if (onRestore) onRestore();
  };

  const getIconState = () => {
    if (isArchived) return 'active';
    if (isIconActive) return 'active';
    if (isIconHovered && !isMobile) return 'hover';
    return 'default';
  };

  const renderIcon = () => {
    const state = getIconState();
    return <UserMenuIcon type={isMobile ? 'mobile' : 'desktop'} state={state} />;
  };

  const handleIconClick = () => {
    setIsIconActive(true);
    setTimeout(() => setIsIconActive(false), 200);
  };

  return (
    <div className={`user-card ${isArchived ? 'user-card--archived' : ''}`}>
      <img 
        src={avatarUrl} 
        alt={user.username} 
        className={`user-card__avatar ${isArchived ? 'user-card__avatar--archived' : ''}`}
      />
      
      <div className="user-card__info">
        <div className="user-card__details">
          <div className="user-card__username-row">
            <h3 className={`user-card__username ${isArchived ? 'user-card__username--archived' : ''}`}>
              {user.username}
            </h3>
            <div 
              className="user-card__icon-wrapper"
              onMouseEnter={() => !isMobile && setIsIconHovered(true)}
              onMouseLeave={() => !isMobile && setIsIconHovered(false)}
            >
              {!isArchived ? (
                <Dropdown 
                  onEdit={handleEdit}
                  onArchive={handleArchive}
                  onHide={handleHide}
                  triggerIcon={renderIcon}
                  onIconClick={handleIconClick}
                />
              ) : (
                <ArchiveDropdown 
                  onRestore={handleRestore}
                  triggerIcon={renderIcon}
                  onIconClick={handleIconClick}
                />
              )}
            </div>
          </div>
          <div className={`user-card__company ${isArchived ? 'user-card__company--archived' : ''}`}>
            {user.company.name}
          </div>
        </div>
        
        <div className={`user-card__city ${isArchived ? 'user-card__city--archived' : ''}`}>
          {user.address.city}
        </div>
      </div>
    </div>
  );
};