import { useState } from 'react';
import { Role, Permission } from '../types';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { permissions } from '../data/mockData';

interface RoleTableProps {
  roles: Role[];
  onUpdateRole: (role: Role) => void;
  onDeleteRole: (id: string) => void;
  onAddRole: (role: Role) => void;
}

export function RoleTable({ roles, onUpdateRole, onDeleteRole, onAddRole }: RoleTableProps) {
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<Partial<Role>>({
    name: '',
    permissions: [],
  });

  const handleEditSubmit = () => {
    if (editingRole) {
      onUpdateRole(editingRole);
      setEditingRole(null);
    }
  };

  const handleAddSubmit = () => {
    if (newRole.name) {
      onAddRole({
        id: Date.now().toString(),
        name: newRole.name,
        permissions: newRole.permissions || [],
      });
      setIsAddDialogOpen(false);
      setNewRole({ name: '', permissions: [] });
    }
  };

  const togglePermission = (role: Role, permission: string) => {
    const updatedPermissions = role.permissions.includes(permission)
      ? role.permissions.filter((p) => p !== permission)
      : [...role.permissions, permission];
    return { ...role, permissions: updatedPermissions };
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Roles</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Role</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Role Name"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              />
              <div className="space-y-2">
                <h4 className="font-medium">Permissions</h4>
                <div className="flex flex-wrap gap-2">
                  {permissions.map((permission) => (
                    <Badge
                      key={permission.id}
                      variant={
                        newRole.permissions?.includes(permission.name)
                          ? 'default'
                          : 'outline'
                      }
                      className="cursor-pointer"
                      onClick={() =>
                        setNewRole(
                          togglePermission(
                            { ...newRole, id: '0' } as Role,
                            permission.name
                          )
                        )
                      }
                    >
                      {permission.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button onClick={handleAddSubmit}>Add Role</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Permissions</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-b">
                <td className="p-2">{role.name}</td>
                <td className="p-2">
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <Badge key={permission}>{permission}</Badge>
                    ))}
                  </div>
                </td>
                <td className="p-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Role</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Role Name"
                          value={editingRole?.name || role.name}
                          onChange={(e) =>
                            setEditingRole({ ...role, name: e.target.value })
                          }
                        />
                        <div className="space-y-2">
                          <h4 className="font-medium">Permissions</h4>
                          <div className="flex flex-wrap gap-2">
                            {permissions.map((permission) => (
                              <Badge
                                key={permission.id}
                                variant={
                                  (editingRole || role).permissions.includes(
                                    permission.name
                                  )
                                    ? 'default'
                                    : 'outline'
                                }
                                className="cursor-pointer"
                                onClick={() =>
                                  setEditingRole(
                                    togglePermission(
                                      editingRole || role,
                                      permission.name
                                    )
                                  )
                                }
                              >
                                {permission.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button onClick={handleEditSubmit}>Save Changes</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteRole(role.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}