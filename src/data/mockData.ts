
import { User, Role, Permission } from '../types';

export const users: User[] = [
  {
    "id": "1",
    "name": "Kevin Wood",
    "email": "watkinsbradley@smith.com",
    "role": "Admin",
    "status": "active"
  },
  {
    "id": "2",
    "name": "Emily James",
    "email": "yhaley@gmail.com",
    "role": "HR",
    "status": "inactive"
  },
  {
    "id": "3",
    "name": "Rebecca Dodson PhD",
    "email": "chelsea63@gmail.com",
    "role": "HR",
    "status": "inactive"
  },
  {
    "id": "4",
    "name": "Matthew Burns",
    "email": "fmurphy@sanchez.com",
    "role": "Intern",
    "status": "inactive"
  },
  {
    "id": "5",
    "name": "Lisa Browning",
    "email": "gayamber@ellison.org",
    "role": "Intern",
    "status": "inactive"
  },
  {
    "id": "6",
    "name": "Jamie Moore",
    "email": "sarahmiller@henderson.com",
    "role": "Intern",
    "status": "inactive"
  },
  {
    "id": "7",
    "name": "Emily Alexander",
    "email": "angela61@phillips.org",
    "role": "Intern",
    "status": "inactive"
  },
  {
    "id": "8",
    "name": "Michael Fields",
    "email": "martinbrian@hendricks-cox.com",
    "role": "SDE",
    "status": "inactive"
  },
  {
    "id": "9",
    "name": "Thomas Black",
    "email": "kaylawilliamson@gmail.com",
    "role": "Intern",
    "status": "inactive"
  },
  {
    "id": "10",
    "name": "Ian Clayton",
    "email": "gilmoregregory@coleman-russell.com",
    "role": "SDE",
    "status": "inactive"
  },
  {
    "id": "11",
    "name": "Andrew Stanley",
    "email": "brittanygomez@hotmail.com",
    "role": "SDE",
    "status": "inactive"
  },
  {
    "id": "12",
    "name": "Daniel Turner",
    "email": "osilva@gmail.com",
    "role": "SDE",
    "status": "inactive"
  },
  {
    "id": "13",
    "name": "Kimberly Carney",
    "email": "anthony00@yahoo.com",
    "role": "SDE",
    "status": "inactive"
  },
  {
    "id": "14",
    "name": "Jared Buckley",
    "email": "phillipgoodwin@hotmail.com",
    "role": "SDE",
    "status": "inactive"
  },
  {
    "id": "15",
    "name": "Victor Jones",
    "email": "kyleschultz@barker.com",
    "role": "SDE",
    "status": "inactive"
  },
  {
    "id": "16",
    "name": "Robert Harrison",
    "email": "odavis@gmail.com",
    "role": "SDE",
    "status": "inactive"
  },
  {
    "id": "17",
    "name": "Gordon Grant III",
    "email": "kmorrow@yahoo.com",
    "role": "SDE",
    "status": "inactive"
  }
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
  {
    id: '3',
    name: 'Task',
    description: 'List of Task',
  },
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
    permissions: ['Task'],
  },
  {
    id: '3',
    name: 'SDE',
    permissions: ['Task'],
  },
  {
    id: '4',
    name: 'HR',
    permissions: ['Employee Performance'],
  },
];

