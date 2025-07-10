
import { useState } from 'react';
import { Building2, Users, MapPin, Plus, AlertCircle } from 'lucide-react';

const CellManagement = () => {
  const [selectedBlock, setSelectedBlock] = useState('all');

  // Mock data - replace with API calls
  const cells = [
    {
      id: 1,
      cellNumber: 'A-101',
      block: 'A',
      capacity: 2,
      currentOccupancy: 1,
      inmates: ['John Doe (INM-2024-001)'],
      status: 'Available',
      type: 'Standard'
    },
    {
      id: 2,
      cellNumber: 'A-102',
      block: 'A',
      capacity: 2,
      currentOccupancy: 2,
      inmates: ['Sarah Wilson (INM-2024-003)', 'Lisa Garcia (INM-2024-005)'],
      status: 'Full',
      type: 'Standard'
    },
    {
      id: 3,
      cellNumber: 'B-205',
      block: 'B',
      capacity: 1,
      currentOccupancy: 1,
      inmates: ['Jane Smith (INM-2024-002)'],
      status: 'Full',
      type: 'Solitary'
    },
    {
      id: 4,
      cellNumber: 'B-301',
      block: 'B',
      capacity: 2,
      currentOccupancy: 1,
      inmates: ['Michael Johnson (INM-2024-004)'],
      status: 'Available',
      type: 'Standard'
    },
    {
      id: 5,
      cellNumber: 'C-301',
      block: 'C',
      capacity: 2,
      currentOccupancy: 0,
      inmates: [],
      status: 'Empty',
      type: 'Standard'
    },
    {
      id: 6,
      cellNumber: 'C-302',
      block: 'C',
      capacity: 2,
      currentOccupancy: 0,
      inmates: [],
      status: 'Maintenance',
      type: 'Standard'
    }
  ];

  const blocks = ['A', 'B', 'C'];
  
  const filteredCells = selectedBlock === 'all' 
    ? cells 
    : cells.filter(cell => cell.block === selectedBlock);

  const getCellStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status.toLowerCase()) {
      case 'available':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'full':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'empty':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'maintenance':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getCellTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'solitary':
        return 'text-orange-600';
      case 'standard':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getOccupancyLevel = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage === 0) return 'empty';
    if (percentage < 100) return 'partial';
    return 'full';
  };

  // Statistics
  const totalCells = cells.length;
  const availableCells = cells.filter(cell => cell.status === 'Available').length;
  const fullCells = cells.filter(cell => cell.status === 'Full').length;
  const maintenanceCells = cells.filter(cell => cell.status === 'Maintenance').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Cell Management</h1>
        </div>
        <p className="text-gray-600">Monitor and manage facility cells and inmate assignments</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cells</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalCells}</p>
            </div>
            <Building2 className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{availableCells}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="h-4 w-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Full</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{fullCells}</p>
            </div>
            <div className="h-8 w-8 bg-red-100 rounded-lg flex items-center justify-center">
              <div className="h-4 w-4 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{maintenanceCells}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Block:</label>
            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="all">All Blocks</option>
              {blocks.map(block => (
                <option key={block} value={block}>Block {block}</option>
              ))}
            </select>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Cell
          </button>
        </div>
      </div>

      {/* Cells Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCells.map((cell) => (
          <div key={cell.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {/* Cell Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Cell {cell.cellNumber}</h3>
                  <p className={`text-sm ${getCellTypeColor(cell.type)}`}>{cell.type}</p>
                </div>
              </div>
              <span className={getCellStatusBadge(cell.status)}>
                {cell.status}
              </span>
            </div>

            {/* Occupancy Info */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Occupancy</span>
                <span className="text-sm font-medium text-gray-900">
                  {cell.currentOccupancy}/{cell.capacity}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    getOccupancyLevel(cell.currentOccupancy, cell.capacity) === 'empty' 
                      ? 'bg-gray-300' 
                      : getOccupancyLevel(cell.currentOccupancy, cell.capacity) === 'partial'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${(cell.currentOccupancy / cell.capacity) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Current Inmates */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Current Inmates</h4>
              {cell.inmates.length > 0 ? (
                <div className="space-y-1">
                  {cell.inmates.map((inmate, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <Users className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{inmate}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No inmates assigned</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button 
                className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                disabled={cell.status === 'Maintenance'}
              >
                {cell.status === 'Available' || cell.status === 'Empty' ? 'Assign Inmate' : 'Transfer'}
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCells.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cells found</h3>
          <p className="text-gray-500">No cells available in the selected block</p>
        </div>
      )}
    </div>
  );
};

export default CellManagement;
