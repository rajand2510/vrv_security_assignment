import { User, Role, Permission } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Rajan Dhariyaparmar',
    email: 'rajand2510@gmail.com',
    role: 'Admin',
    status: 'active',
  },
  {
    id: '2',
    name: 'Deep Varmora',
    email: 'deep23@gmail.com',
    role: 'Intern',
    status: 'active',
  },
  // Add more users as needed
];

export const roles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    permissions: ['Employee Performance', 'System Log'],
  },
  {
    id: '2',
    name: 'Intern',
    permissions: ['Employee Performance'],
  },
];

export const permissions: Permission[] = [
  {
    id: '1',
    name: 'Employee Performance',
    description: 'Allows viewing performance metrics, feedback, and goals for employees.',
  },
  {
    id: '2',
    name: 'System Log',
    description: 'Provides access to activity logs, tracking system changes.',
  },
];