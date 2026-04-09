// src/pages/edit-page/index.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userApi } from '../../entities/user/api/user-api';
import { useUserStore } from '../../entities/user/model/user-store';
import { userValidationSchema, type UserFormData } from '../../entities/user/model/validation';
import { Header } from '../../widgets/header/Header';
import { BackButton } from '../../shared/ui/BackButton/BackButton';
import { Toast } from '../../shared/ui/Toast/Toast';
import { EditSidebarNav } from '../../widgets/edit-sidebar-nav/EditSidebarNav';
import { EditForm } from '../../widgets/edit-form/EditForm';
import { useState, useEffect } from 'react';
import './EditPage.scss';

export const EditPage = () => {
  const [activeNav, setActiveNav] = useState('profile');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = Number(id);
  const [showToast, setShowToast] = useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUserById(userId),
  });

  const { updateUser, usersWithStatus } = useUserStore();
  const storedUser = usersWithStatus.find((u) => u.id === userId);
  const currentUser = storedUser || user;

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(userValidationSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      city: '',
      phone: '',
      companyName: '',
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    if (currentUser) {
      setValue('name', currentUser.name);
      setValue('username', currentUser.username);
      setValue('email', currentUser.email);
      setValue('city', currentUser.address.city);
      setValue('phone', currentUser.phone.replace(/\D/g, ''));
      setValue('companyName', currentUser.company.name);
    }
  }, [currentUser, setValue]);

  const onSubmit = (data: UserFormData) => {
    if (!currentUser) return;

    updateUser(userId, {
      name: data.name,
      username: data.username,
      email: data.email,
      address: { ...currentUser.address, city: data.city },
      phone: data.phone,
      company: { ...currentUser.company, name: data.companyName },
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="edit-page">
          <div className="loader">Загрузка данных пользователя...</div>
        </div>
      </>
    );
  }

  if (!currentUser) {
    return (
      <>
        <Header />
        <div className="edit-page">
          <div className="error">Пользователь не найден</div>
        </div>
      </>
    );
  }

  const avatarUrl = `https://i.pravatar.cc/300?img=${userId}`;

  return (
    <>
      <Header />
      <div className="edit-page">
        <div className="container">
          <BackButton onClick={() => navigate('/')} />

          <div className="edit-page__content">
            <div className="edit-page__sidebar">
              <img src={avatarUrl} alt={currentUser.username} className="edit-page__avatar" />
              <EditSidebarNav activeNav={activeNav} onNavChange={setActiveNav} />
            </div>

            <div className="edit-page__form-wrapper">
              <div className="edit-page__form-header">
                <h2 className="edit-page__form-title">Данные профиля</h2>
                <div className="edit-page__divider"></div>
              </div>

              <EditForm
                watchedValues={watchedValues}
                setValue={setValue}
                errors={errors}
                onSubmit={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </div>
      </div>

      <Toast isVisible={showToast} onClose={() => setShowToast(false)} />
    </>
  );
};