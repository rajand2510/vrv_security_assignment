import { useState } from 'react';
import { Permission } from '../types';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface PermissionTableProps {
  permissions: Permission[];
  onUpdatePermission: (permission: Permission) => void;
  onDeletePermission: (id: string) => void;
  onAddPermission: (permission: Permission) => void;
}

export function PermissionTable({
  permissions,
  onUpdatePermission,
  onDeletePermission,
  onAddPermission,
}: PermissionTableProps) {
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPermission, setNewPermission] = useState<Partial<Permission>>({
    name: '',
    description: '',
  });

  const handleEditSubmit = () => {
    if (editingPermission) {
      onUpdatePermission(editingPermission);
      setEditingPermission(null);
    }
  };

  const handleAddSubmit = () => {
    if (newPermission.name && newPermission.description) {
      onAddPermission({
        id: Date.now().toString(),
        name: newPermission.name,
        description: newPermission.description,
      });
      setIsAddDialogOpen(false);
      setNewPermission({ name: '', description: '' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Permissions</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Permission</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Permission</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Permission Name"
                value={newPermission.name}
                onChange={(e) =>
                  setNewPermission({ ...newPermission, name: e.target.value })
                }
              />
              <Textarea
                placeholder="Description"
                value={newPermission.description}
                onChange={(e) =>
                  setNewPermission({ ...newPermission, description: e.target.value })
                }
              />
              <Button onClick={handleAddSubmit}>Add Permission</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-2 text-left">Permission</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission) => (
              <tr key={permission.id} className="border-b">
                <td className="p-2">{permission.name}</td>
                <td className="p-2">{permission.description}</td>
                <td className="p-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mr-2">
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Permission</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Permission Name"
                          value={editingPermission?.name || permission.name}
                          onChange={(e) =>
                            setEditingPermission({
                              ...permission,
                              name: e.target.value,
                            })
                          }
                        />
                        <Textarea
                          placeholder="Description"
                          value={editingPermission?.description || permission.description}
                          onChange={(e) =>
                            setEditingPermission({
                              ...permission,
                              description: e.target.value,
                            })
                          }
                        />
                        <Button onClick={handleEditSubmit}>Save Changes</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeletePermission(permission.id)}
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