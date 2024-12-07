import { useState } from 'react';
import { User } from '@/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { roles } from '@/data/mockData';
import { useUsers } from '@/hooks/useUsers';

export function UserTable() {
  const { users, updateUser, deleteUser, addUser } = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
    role: '',
    status: 'active', // Default status is active when adding a new user
  });

  const handleEditSubmit = () => {
    if (editingUser) {
      updateUser(editingUser);
      setIsEditDialogOpen(false);
      setEditingUser(null);
    }
  };

  const handleAddSubmit = () => {
    if (newUser.name && newUser.email && newUser.role) {
      addUser({
        ...newUser as User,
        id: Date.now().toString(), // Ensure that id is always a string
      });
      setIsAddDialogOpen(false);
      setNewUser({ name: '', email: '', role: '', status: 'active' });
    }
  };

  const handleStatusChange = (user: User, status: 'active' | 'inactive') => {
    updateUser({
      ...user,
      status,
    });
  };

  const statusClasses = (status: 'active' | 'inactive') => {
    if (status === 'active') return 'bg-green-100 text-green-500 rounded pb-1 px-2 w-[52px]'; // Green background and text for active
    if (status === 'inactive') return 'rounded px-2 w-16 bg-red-100 pb-1 text-red-500'; // Red background and text for inactive
    return 'bg-gray-100 text-gray-500'; // Default gray for other statuses
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <Select
                value={newUser.role}
                onValueChange={(value) => setNewUser({ ...newUser, role: value })}
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
              <Button onClick={handleAddSubmit}>Add User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="card border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">Role: {user.role}</p>
            <p className={`text-sm ${statusClasses(user.status)}`}>
              {user.status === 'active' ? 'Active' : 'Inactive'}
            </p>
            <div className="flex justify-between mt-4">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => {
                      setEditingUser({ ...user }); // Ensure editingUser is correctly set with all fields
                      setIsEditDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Name"
                      value={editingUser?.name || ''}
                      onChange={(e) =>
                        setEditingUser((prev) => ({
                          ...prev!,
                          name: e.target.value,
                        }))
                      }
                    />
                    <Select
                      value={editingUser?.role || ''}
                      onValueChange={(value) =>
                        setEditingUser((prev) => ({
                          ...prev!,
                          role: value,
                        }))
                      }
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
                    <Select
                      value={editingUser?.status || 'active'}
                      onValueChange={(value) =>
                        setEditingUser((prev) => ({
                          ...prev!,
                          status: value as 'active' | 'inactive', // Ensuring correct status type
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() => {
                        if (editingUser) {
                          handleStatusChange(editingUser, editingUser.status);
                          handleEditSubmit();
                        }
                      }}
                    >
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
