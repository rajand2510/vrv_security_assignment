import { useState } from 'react';
import { Permission } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePermissions } from '@/hooks/usePermissions';

export function PermissionData() {
  const { permissions, updatePermission, deletePermission, addPermission } = usePermissions();
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newPermission, setNewPermission] = useState<Partial<Permission>>({
    name: '',
    description: '',
  });

  const handleEditSubmit = () => {
    if (editingPermission) {
      updatePermission(editingPermission);
      setIsEditDialogOpen(false);
      setEditingPermission(null);
    }
  };

  const handleAddSubmit = () => {
    if (newPermission.name && newPermission.description) {
      addPermission({
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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} className="backdrop-opacity-50 backdrop:bg-black">
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

      {/* Cards container with optimized layout */}
      <div className="flex flex-wrap gap-6 justify-start border p-4">
        {permissions.length === 0 ? (
          // Placeholder for three empty cards
          <div className="flex gap-6 w-full">
            <div className="flex flex-col p-6 border rounded-md w-[30%] h-[250px] bg-gray-100"></div>
            <div className="flex flex-col p-6 border rounded-md w-[30%] h-[250px] bg-gray-100"></div>
            <div className="flex flex-col p-6 border rounded-md w-[30%] h-[250px] bg-gray-100"></div>
          </div>
        ) : (
          permissions.map((permission) => (
            <div
              key={permission.id}
              className="flex flex-col p-6 border rounded-md w-[30%] h-[250px] bg-white shadow-md"
            >
              <div className="font-bold text-lg">{permission.name}</div>
              <div className="text-sm flex-1 overflow-auto">{permission.description}</div>
              <div className="mt-auto flex gap-2">
                {/* Edit Button */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => setEditingPermission(permission)}
                    >
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
                {/* Delete Button */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deletePermission(permission.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
