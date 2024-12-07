
import { RoleTable } from '@/components/tables/RoleTable';
import { PermissionData} from '@/components/tables/PermissionData';
import { useNavigationState } from '@/hooks/useNavigationState';
import { Dashboard } from '../tables/Dashboard';
import { UserTable }from '../tables/UserTable';

export function MainContent() {
  const { activeTab } = useNavigationState();

  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-5">VRV User Dashboard</h1>
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'users' && <UserTable/>}
      {activeTab === 'roles' && <RoleTable />}
      {activeTab === 'permissions' && <PermissionData />}
    </div>
  );
}