
import { useState, useEffect } from 'react';
import { userApi } from '../../entities/user/api/user-api';
import { useUserStore } from '../../entities/user/model/user-store';
import { UserCard } from '../../widgets/user-card/UserCard';
import { Header } from '../../widgets/header/Header';
import { Loader } from '../../shared/ui/Loader/Loader';
import { ErrorMessage } from '../../shared/ui/ErrorMessage/ErrorMessage';
import { Section } from '../../widgets/section/Section';
import { CardsGrid } from '../../widgets/cards-grid/CardsGrid';
import './MainPage.scss';

export const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { usersWithStatus, setUsers, archiveUser, hideUser, restoreUser } = useUserStore();
  
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await userApi.getUsers();
        setUsers(users);
        setIsLoading(false);
      } catch (err) {
        setError('Не удалось загрузить пользователей');
        setIsLoading(false);
      }
    };
    
    loadUsers();
  }, [setUsers]);
  
  const activeUsers = usersWithStatus.filter(u => u.status === 'active');
  const archivedUsers = usersWithStatus.filter(u => u.status === 'archived');
  
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="main-page">
          <div className="container">
            <Loader />
          </div>
        </div>
      </>
    );
  }
  
  if (error) {
    return (
      <>
        <Header />
        <div className="main-page">
          <div className="container">
            <ErrorMessage />
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Header />
      <div className="main-page">
        <div className="container">
          <Section title="Активные">
            <CardsGrid isEmpty={activeUsers.length === 0}>
              {activeUsers.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  onArchive={() => archiveUser(user.id)}
                  onHide={() => hideUser(user.id)}
                />
              ))}
            </CardsGrid>
          </Section>
          
          {archivedUsers.length > 0 && (
            <Section title="Архив" isArchived>
              <CardsGrid>
                {archivedUsers.map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onRestore={() => restoreUser(user.id)}
                  />
                ))}
              </CardsGrid>
            </Section>
          )}
        </div>
      </div>
    </>
  );
};