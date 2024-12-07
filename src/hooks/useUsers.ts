import { create } from 'zustand';
import { User } from '@/types';
import { users as initialUsers } from '@/data/mockData';

type UsersState = {
  users: User[];
  updateUser: (updatedUser: User) => void;
  deleteUser: (id: string) => void;
  addUser: (newUser: User) => void;
};

export const useUsers = create<UsersState>((set) => ({
  users: initialUsers,
  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  addUser: (newUser) =>
    set((state) => ({
      users: [...state.users, newUser],
    })),
}));