
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserWithStatus } from './types';

interface UserStore {
  usersWithStatus: UserWithStatus[];
  setUsers: (users: User[]) => void;
  archiveUser: (userId: number) => void;
  hideUser: (userId: number) => void;
  restoreUser: (userId: number) => void;
  updateUser: (userId: number, updatedUser: Partial<User>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      usersWithStatus: [],
      
      setUsers: (users) =>
        set({
          usersWithStatus: users.map((user) => ({
            ...user,
            status: 'active',
          })),
        }),
      
      archiveUser: (userId) =>
        set((state) => ({
          usersWithStatus: state.usersWithStatus.map((user) =>
            user.id === userId && user.status === 'active'
              ? { ...user, status: 'archived' }
              : user
          ),
        })),
      
      hideUser: (userId) =>
        set((state) => ({
          usersWithStatus: state.usersWithStatus.map((user) =>
            user.id === userId && user.status === 'active'
              ? { ...user, status: 'hidden' }
              : user
          ),
        })),
      
      restoreUser: (userId) =>
        set((state) => ({
          usersWithStatus: state.usersWithStatus.map((user) =>
            user.id === userId && user.status === 'archived'
              ? { ...user, status: 'active' }
              : user
          ),
        })),
      
      updateUser: (userId, updatedUser) =>
        set((state) => ({
          usersWithStatus: state.usersWithStatus.map((user) =>
            user.id === userId
              ? { ...user, ...updatedUser }
              : user
          ),
        })),
    }),
    {
      name: 'user-storage',
    }
  )
);