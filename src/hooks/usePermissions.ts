import { create } from 'zustand';
import { Permission } from '@/types';
import { permissions as initialPermissions } from '@/data/mockData';

type PermissionsState = {
  permissions: Permission[];
  updatePermission: (updatedPermission: Permission) => void;
  deletePermission: (id: string) => void;
  addPermission: (newPermission: Permission) => void;
};

export const usePermissions = create<PermissionsState>((set) => ({
  permissions: initialPermissions,
  updatePermission: (updatedPermission) =>
    set((state) => ({
      permissions: state.permissions.map((permission) =>
        permission.id === updatedPermission.id ? updatedPermission : permission
      ),
    })),
  deletePermission: (id) =>
    set((state) => ({
      permissions: state.permissions.filter((permission) => permission.id !== id),
    })),
  addPermission: (newPermission) =>
    set((state) => ({
      permissions: [...state.permissions, newPermission],
    })),
}));