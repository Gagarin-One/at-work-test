
import { TextField } from '../../shared/ui/TextField/TextField';
import { ResponsiveButton } from '../../shared/ui/ResponsiveButton/ResponsiveButton';

import './EditForm.scss';
import type { UserFormData } from '../../entities/user/model/validation';
import type { FieldErrors, UseFormSetValue } from 'react-hook-form';

interface EditFormProps {
  watchedValues: Partial<UserFormData>;
  setValue: UseFormSetValue<UserFormData>;
  errors: FieldErrors<UserFormData>;
  onSubmit: () => void;
}

export const EditForm = ({ watchedValues, setValue, errors, onSubmit }: EditFormProps) => {
  return (
    <form onSubmit={onSubmit} className="edit-form">
      <TextField
        label="Имя"
        value={watchedValues.name || ''}
        onChange={(value) => setValue('name', value)}
        error={errors.name?.message}
        size="desktop"
        name="name"
      />

      <TextField
        label="Никнейм"
        value={watchedValues.username || ''}
        onChange={(value) => setValue('username', value)}
        error={errors.username?.message}
        size="desktop"
        name="username"
      />

      <TextField
        label="Почта"
        value={watchedValues.email || ''}
        onChange={(value) => setValue('email', value)}
        error={errors.email?.message}
        size="desktop"
        name="email"
      />

      <TextField
        label="Город"
        value={watchedValues.city || ''}
        onChange={(value) => setValue('city', value)}
        error={errors.city?.message}
        size="desktop"
        name="city"
      />

      <TextField
        label="Телефон"
        value={watchedValues.phone || ''}
        onChange={(value) => {
          const onlyNumbers = value.replace(/\D/g, '');
          setValue('phone', onlyNumbers);
        }}
        error={errors.phone?.message}
        size="desktop"
        placeholder="Только цифры"
        name="phone"
      />

      <TextField
        label="Название компании"
        value={watchedValues.companyName || ''}
        onChange={(value) => setValue('companyName', value)}
        error={errors.companyName?.message}
        size="desktop"
        name="companyName"
      />
      
      <div className="edit-form__button-wrapper">
        <ResponsiveButton text="Сохранить" state="default" type="submit" />
      </div>
    </form>
  );
};