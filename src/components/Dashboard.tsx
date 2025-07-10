
import { Users, Building2, UserCheck, Calendar, TrendingUp, Clock } from 'lucide-react';

const Dashboard = () => {
  // Mock data - replace with API calls
  const stats = [
    {
      title: 'Total Inmates',
      value: '247',
      change: '+5',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Available Cells',
      value: '12',
      change: '-2',
      changeType: 'decrease',
      icon: Building2,
      color: 'bg-green-500'
    },
    {
      title: 'Visitors Today',
      value: '18',
      change: '+3',
      changeType: 'increase',
      icon: UserCheck,
      color: 'bg-purple-500'
    },
    {
      title: 'Releases This Week',
      value: '4',
      change: '+1',
      changeType: 'increase',
      icon: Calendar,
      color: 'bg-orange-500'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'New inmate registered', details: 'John Doe - ID: INM-2024-001', time: '2 hours ago' },
    { id: 2, action: 'Visitor logged', details: 'Sarah Smith visited Jane Doe', time: '4 hours ago' },
    { id: 3, action: 'Cell transfer', details: 'Mike Johnson moved to Cell B-205', time: '6 hours ago' },
    { id: 4, action: 'Inmate released', details: 'Robert Brown - ID: INM-2023-156', time: '1 day ago' },
  ];

  const upcomingReleases = [
    { id: 1, name: 'Alice Cooper', inmateId: 'INM-2023-045', releaseDate: '2024-07-15', cell: 'A-101' },
    { id: 2, name: 'David Wilson', inmateId: 'INM-2023-089', releaseDate: '2024-07-18', cell: 'B-203' },
    { id: 3, name: 'Emma Davis', inmateId: 'INM-2023-134', releaseDate: '2024-07-22', cell: 'C-301' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the Inmate Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last week</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.details}</p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3 w-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Releases */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Releases</h2>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingReleases.map((release) => (
              <div key={release.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{release.name}</p>
                  <p className="text-xs text-gray-500">{release.inmateId} • Cell {release.cell}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">{release.releaseDate}</p>
                  <p className="text-xs text-gray-500">Release Date</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
