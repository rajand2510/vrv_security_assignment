import { Users, Shield, Key } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigationState } from '@/hooks/useNavigationState';

const navigationItems = [
  { id: 'users', label: 'Users', icon: Users },
  { id: 'roles', label: 'Roles', icon: Shield },
  { id: 'permissions', label: 'Permissions', icon: Key },
];

export function Sidebar() {
  const { activeTab, setActiveTab } = useNavigationState();

  return (
    <div className="w-[250px] h-screen bg-background border-r p-4">
      <div className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                'w-full justify-start gap-2',
                activeTab === item.id && 'bg-muted'
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}