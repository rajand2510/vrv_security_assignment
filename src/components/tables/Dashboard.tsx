import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Users, UserPlus } from 'lucide-react';
import { users } from '@/data/mockData';

export function Dashboard() {
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  });

  const [roleStats, setRoleStats] = useState<Record<string, number>>({});

  useEffect(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === 'active').length;
    const inactiveUsers = totalUsers - activeUsers;

    const roleCounts: Record<string, number> = {};
    users.forEach((user) => {
      roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
    });

    setUserStats({
      totalUsers,
      activeUsers,
      inactiveUsers,
    });

    setRoleStats(roleCounts);
  }, []);

  return (
    <div className="w-full h-full px-6 py-6 flex flex-wrap gap-4 justify-start">
      {/* Total Users Card */}
      <Card className="w-72 h-40 p-4 flex flex-col justify-between items-center shadow-md bg-white">
        <div className="space-y-2 text-center">
          <h3 className="text-md font-semibold">Total Users</h3>
          <p className="text-xl font-bold">{userStats.totalUsers}</p>
        </div>
        <Users size={28} />
      </Card>

      {/* Active Users Card */}
      <Card className="w-72 h-40 p-4 flex flex-col justify-between items-center shadow-md bg-white">
        <div className="space-y-2 text-center">
          <h3 className="text-md font-semibold">Active Users</h3>
          <p className="text-xl font-bold">{userStats.activeUsers}</p>
        </div>
        <Users size={28} color="green" />
      </Card>

      {/* Inactive Users Card */}
      <Card className="w-72 h-40 p-4 flex flex-col justify-between items-center shadow-md bg-white">
        <div className="space-y-2 text-center">
          <h3 className="text-md font-semibold">Inactive Users</h3>
          <p className="text-xl font-bold">{userStats.inactiveUsers}</p>
        </div>
        <Users size={28} color="red" />
      </Card>

      {/* Dynamic Role Cards */}
      {Object.entries(roleStats).map(([roleName, roleCount]) => (
        <Card
          key={roleName}
          className="w-72 h-40 p-4 flex flex-col justify-between items-center shadow-md bg-white"
        >
          <div className="space-y-2 text-center">
            <h3 className="text-md font-semibold">{roleName}</h3>
            <p className="text-xl font-bold">{roleCount}</p>
          </div>
          <UserPlus size={28} />
        </Card>
      ))}
    </div>
  );
}
