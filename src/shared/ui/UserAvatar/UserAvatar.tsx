
import './UserAvatar.scss';

interface UserAvatarProps {
  username: string;
}

export const UserAvatar = ({ username }: UserAvatarProps) => {
  return (
    <div className="user-avatar">
      <div className="user-avatar__image"></div>
      <span className="user-avatar__name">{username}</span>
    </div>
  );
};