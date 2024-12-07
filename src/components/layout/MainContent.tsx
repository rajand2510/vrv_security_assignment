import { UserTable } from '@/components/tables/UserTable';
import { RoleTable } from '@/components/tables/RoleTable';
import { PermissionTable } from '@/components/tables/PermissionTable';
import { useNavigationState } from '@/hooks/useNavigationState';

export function MainContent() {
  const { activeTab } = useNavigationState();

  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-8">User Management Dashboard</h1>
      
      {activeTab === 'users' && <UserTable />}
      {activeTab === 'roles' && <RoleTable />}
      {activeTab === 'permissions' && <PermissionTable />}
    </div>
  );
}