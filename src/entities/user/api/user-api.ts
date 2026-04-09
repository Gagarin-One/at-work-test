
import type { User } from '../model/types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    const users = await response.json();
    // Берем только первых 6 пользователей
    return users.slice(0, 6);
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },
};