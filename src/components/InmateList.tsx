
import { useState } from 'react';
import { Search, Filter, Eye, Edit, MoreVertical, Users } from 'lucide-react';

const InmateList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with API calls
  const inmates = [
    {
      id: 1,
      inmateId: 'INM-2024-001',
      firstName: 'John',
      lastName: 'Doe',
      age: 32,
      gender: 'Male',
      offense: 'Theft',
      admissionDate: '2024-01-15',
      cell: 'A-101',
      status: 'Active'
    },
    {
      id: 2,
      inmateId: 'INM-2024-002',
      firstName: 'Jane',
      lastName: 'Smith',
      age: 28,
      gender: 'Female',
      offense: 'Fraud',
      admissionDate: '2024-02-10',
      cell: 'B-205',
      status: 'Active'
    },
    {
      id: 3,
      inmateId: 'INM-2023-156',
      firstName: 'Robert',
      lastName: 'Brown',
      age: 45,
      gender: 'Male',
      offense: 'Drug Possession',
      admissionDate: '2023-12-05',
      cell: 'C-301',
      status: 'Released'
    },
    {
      id: 4,
      inmateId: 'INM-2024-003',
      firstName: 'Sarah',
      lastName: 'Wilson',
      age: 35,
      gender: 'Female',
      offense: 'Assault',
      admissionDate: '2024-03-01',
      cell: 'A-102',
      status: 'Active'
    },
    {
      id: 5,
      inmateId: 'INM-2024-004',
      firstName: 'Michael',
      lastName: 'Johnson',
      age: 29,
      gender: 'Male',
      offense: 'Burglary',
      admissionDate: '2024-03-15',
      cell: 'B-301',
      status: 'Active'
    }
  ];

  const filteredInmates = inmates.filter(inmate => {
    const matchesSearch = 
      inmate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inmate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inmate.inmateId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || inmate.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status.toLowerCase()) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'released':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'transferred':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <Users className="h-6 w-6 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Inmate Management</h1>
        </div>
        <p className="text-gray-600">Manage and view all inmates in the system</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or inmate ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="released">Released</option>
                <option value="transferred">Transferred</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredInmates.length} of {inmates.length} inmates
        </p>
      </div>

      {/* Inmates Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inmate
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Offense
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cell
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInmates.map((inmate) => (
                <tr key={inmate.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {inmate.firstName} {inmate.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{inmate.inmateId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Age: {inmate.age}</div>
                    <div className="text-sm text-gray-500">{inmate.gender}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inmate.offense}</div>
                    <div className="text-sm text-gray-500">Admitted: {inmate.admissionDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{inmate.cell}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(inmate.status)}>
                      {inmate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1 rounded-lg hover:bg-blue-50 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1 rounded-lg hover:bg-gray-50 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1 rounded-lg hover:bg-gray-50 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredInmates.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No inmates found</h3>
          <p className="text-gray-500">
            {searchTerm || filterStatus !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'No inmates have been registered yet'}
          </p>
        </div>
      )}
    </div>
  );
};

export default InmateList;
