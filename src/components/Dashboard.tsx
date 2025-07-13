import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { Calendar, TrendingUp, Clock, MapPin } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Calendar,
  TrendingUp,
  Clock,
  MapPin,
};

const fetchStats = async (): Promise<Stat[]> => {
  const { data } = await api.get<Stat[]>('/dashboard/stats/');
  return data;
};

const fetchRecentActivity = async (): Promise<Activity[]> => {
  const { data } = await api.get<Activity[]>('/dashboard/activity/');
  return data;
};

const fetchUpcomingReleases = async (): Promise<Release[]> => {
  const { data } = await api.get<Release[]>('/dashboard/releases/');
  return data;
};

type Stat = {
  title: string;
  value: number | string;
  change: string;
  changeType: 'increase' | 'decrease';
  color: string;
  icon: string; // string name from backend
};

type Activity = {
  id: string | number;
  action: string;
  details: string;
  time: string;
};

type Release = {
  id: string | number;
  name: string;
  inmateId: string | number;
  cell: string | { cellNumber: string | number } | null; // can be string or populated object or null
  releaseDate: string;
};

const Dashboard = () => {
  const { data: stats = [], isLoading: statsLoading } = useQuery<Stat[]>({
    queryKey: ['dashboardStats'],
    queryFn: fetchStats,
    initialData: [],
  });
  const { data: recentActivity = [], isLoading: activityLoading } = useQuery<Activity[]>({
    queryKey: ['dashboardActivity'],
    queryFn: fetchRecentActivity,
    initialData: [],
  });
  const { data: upcomingReleases = [], isLoading: releasesLoading } = useQuery<Release[]>({
    queryKey: ['dashboardReleases'],
    queryFn: fetchUpcomingReleases,
    initialData: [],
  });

  if (statsLoading || activityLoading || releasesLoading) return <p>Loading dashboard...</p>;

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
          const Icon = iconMap[stat.icon] || Calendar; // fallback icon
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            {upcomingReleases.map((release) => {
              // Determine cell number string safely
              let cellNumber = 'Unassigned';
              if (typeof release.cell === 'string' || typeof release.cell === 'number') {
                cellNumber = String(release.cell);
              } else if (release.cell && typeof release.cell === 'object' && 'cellNumber' in release.cell) {
                cellNumber = String(release.cell.cellNumber);
              }
              return (
                <div key={release.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{release.name}</p>
                    <p className="text-xs text-gray-500">{release.inmateId} • Cell {cellNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">{release.releaseDate}</p>
                    <p className="text-xs text-gray-500">Release Date</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
