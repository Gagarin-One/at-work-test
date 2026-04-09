
import './ErrorMessage.scss';

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({ 
  message = 'Не удалось загрузить карточки пользователей.' 
}: ErrorMessageProps) => {
  return (
    <div className="error-message">
      <p>{message}</p>
      <p>
        Если у вас не загрузились карточки, то возможно из-за выключенного VPN. 
        Сервер <code>https://jsonplaceholder.typicode.com/users</code> не возвращает ответ для российских IP-адресов.
      </p>
      <p>Попробуйте включить VPN и обновить страницу.</p>
    </div>
  );
};