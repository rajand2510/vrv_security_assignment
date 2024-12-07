import React, { useState } from 'react';

// Define the User type
interface User {
  id: string; // Ensure 'id' is always a string
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const UserTable: React.FC = () => {
  // Initialize the state for editing user
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Function to handle name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingUser((prev) => {
      if (prev) {
        return {
          ...prev,
          name: e.target.value,
        };
      }
      return prev; // If prev is null, return it as is
    });
  };

  // Function to handle role change
  const handleRoleChange = (value: string) => {
    setEditingUser((prev) => {
      if (prev) {
        return {
          ...prev,
          role: value,
        };
      }
      return prev;
    });
  };

  // Function to handle status change
  const handleStatusChange = (value: 'active' | 'inactive') => {
    setEditingUser((prev) => {
      if (prev) {
        return {
          ...prev,
          status: value,
        };
      }
      return prev;
    });
  };

  return (
    <div>
      <h1>User Table</h1>
      {/* Render user editing form if editingUser is not null */}
      {editingUser && (
        <div>
          <input
            type="text"
            value={editingUser.name}
            onChange={handleNameChange}
            placeholder="Name"
          />
          <select
            value={editingUser.role}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <select
            value={editingUser.status}
            onChange={(e) => handleStatusChange(e.target.value as 'active' | 'inactive')}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default UserTable;
