import { create } from 'zustand';
import { Role } from '@/types';
import { roles as initialRoles } from '@/data/mockData';

type RolesState = {
  roles: Role[];
  updateRole: (updatedRole: Role) => void;
  deleteRole: (id: string) => void;
  addRole: (newRole: Role) => void;
};

export const useRoles = create<RolesState>((set) => ({
  roles: initialRoles,
  updateRole: (updatedRole) =>
    set((state) => ({
      roles: state.roles.map((role) =>
        role.id === updatedRole.id ? updatedRole : role
      ),
    })),
  deleteRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((role) => role.id !== id),
    })),
  addRole: (newRole) =>
    set((state) => ({
      roles: [...state.roles, newRole],
    })),
}));