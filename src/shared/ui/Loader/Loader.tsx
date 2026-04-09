
import './Loader.scss';

interface LoaderProps {
  text?: string;
}

export const Loader = ({ text = 'Загрузка пользователей...' }: LoaderProps) => {
  return (
    <div className="loader">
      {text}
    </div>
  );
};