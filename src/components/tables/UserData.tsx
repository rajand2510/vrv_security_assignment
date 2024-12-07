import { useState, useCallback } from 'react';
import { User } from '@/types';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { roles } from '@/data/mockData';
import { useUsers } from '@/hooks/useUsers';

function UserDialog({
  isOpen, onClose, user, onSubmit, isEdit
}: {
  isOpen: boolean;
  onClose: () => void;
  user: Partial<User>;
  onSubmit: (user: Partial<User>) => void;
  isEdit: boolean;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Name"
            value={user.name || ''}
            onChange={(e) => onSubmit({ ...user, name: e.target.value })}
            className="w-full"
          />
          <Input
            placeholder="Email"
            value={user.email || ''}
            onChange={(e) => onSubmit({ ...user, email: e.target.value })}
            className="w-full"
          />
          <Select
            value={user.role || ''}
            onValueChange={(value) => onSubmit({ ...user, role: value })}
            className="w-full"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.name}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => onSubmit(user)} className="w-full">
            {isEdit ? 'Save Changes' : 'Add User'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function UserData() {
  const { users, updateUser, deleteUser, addUser } = useUsers();
  const [editingUser, setEditingUser] = useState<Partial<User> | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesStatus = statusFilter ? user.status === statusFilter : true;
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesStatus && matchesRole;
  });

  const handleEditSubmit = useCallback((user: Partial<User>) => {
    if (editingUser) {
      updateUser(editingUser);
      setIsEditDialogOpen(false);
      setEditingUser(null);
    }
  }, [editingUser, updateUser]);

  const handleAddSubmit = useCallback((user: Partial<User>) => {
    if (user.name && user.email && user.role) {
      addUser({ ...user as User, id: Date.now().toString() });
      setIsAddDialogOpen(false);
    }
  }, [addUser]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-700">User Management</h2>
        <div className="flex items-center space-x-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 text-white hover:bg-blue-600">Add User</Button>
            </DialogTrigger>
          </Dialog>

          {/* Filter Section */}
          <div className="flex space-x-4">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
              className="w-36"
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={roleFilter}
              onValueChange={setRoleFilter}
              className="w-36"
            >
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All Roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.name}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="rounded-lg border shadow-md bg-white">
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="card p-4 border rounded-lg shadow-sm space-y-4 bg-gray-50">
                <div className="font-semibold text-gray-800">{user.name}</div>
                <div className="text-gray-600">{user.email}</div>
                <div className="text-gray-500">{user.role}</div>
                <div>
                  <Switch
                    initialChecked={user.status === 'active'}
                    onChange={(checked: boolean) =>
                      updateUser({ ...user, status: checked ? 'active' : 'inactive' })
                    }
                  />
                </div>
                <div className="flex justify-between space-x-2">
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600"
                        onClick={() => setEditingUser(user)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">No users found</div>
        )}
      </div>

      {/* User Add/Edit Dialog */}
      <UserDialog
        isOpen={isAddDialogOpen || isEditDialogOpen}
        onClose={() => setIsAddDialogOpen(false) || setIsEditDialogOpen(false)}
        user={editingUser || {}}
        onSubmit={editingUser ? handleEditSubmit : handleAddSubmit}
        isEdit={!!editingUser}
      />
    </div>
  );
}
