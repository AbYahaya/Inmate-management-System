import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { Building2, Users, MapPin, Plus, AlertCircle } from 'lucide-react';

type Inmate = {
  _id: string;
  inmateId: string;
  firstName: string;
  lastName: string;
};

type Cell = {
  _id: string;
  cellNumber: string | number;
  type: string;
  status: string;
  block: string;
  capacity: number;
  inmates?: Inmate[];
};

const fetchCells = async (): Promise<Cell[]> => {
  const { data } = await api.get('/cells/');
  return Array.isArray(data) ? data : [];
};

const blocks = ['A', 'B', 'C'];

const CellManagement = () => {
  const queryClient = useQueryClient();

  const [selectedBlock, setSelectedBlock] = useState('all');
  const [showAddCellModal, setShowAddCellModal] = useState(false);
  const [newCellData, setNewCellData] = useState({
    cellNumber: '',
    block: '',
    capacity: 1,
    type: 'Standard',
  });
  const [addCellError, setAddCellError] = useState('');
  const [isAddingCell, setIsAddingCell] = useState(false);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignCell, setAssignCell] = useState<Cell | null>(null);
  const [assignInmateId, setAssignInmateId] = useState('');
  const [assignError, setAssignError] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);

  const { data: cells = [], isLoading, error } = useQuery<Cell[]>({
    queryKey: ['cells'],
    queryFn: fetchCells,
  });

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

  const getOccupancyLevel = (inmates: Inmate[] | undefined, capacity: number) => {
    const current = inmates ? inmates.length : 0;
    const percentage = (current / capacity) * 100;
    if (percentage === 0) return 'empty';
    if (percentage < 100) return 'partial';
    return 'full';
  };

  const totalCells = cells.length;
  const availableCells = cells.filter(cell => cell.status === 'Available').length;
  const fullCells = cells.filter(cell => cell.status === 'Full').length;
  const maintenanceCells = cells.filter(cell => cell.status === 'Maintenance').length;

  const handleNewCellChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewCellData({
      ...newCellData,
      [e.target.name]: e.target.value,
    });
  };

  const addCell = async () => {
    setAddCellError('');
    setIsAddingCell(true);
    try {
      if (!newCellData.block) {
        setAddCellError('Please select a block');
        setIsAddingCell(false);
        return;
      }
      await api.post('/cells/', {
        cellNumber: newCellData.cellNumber,
        block: newCellData.block,
        capacity: Number(newCellData.capacity),
        type: newCellData.type,
        status: 'Empty',
      });
      setShowAddCellModal(false);
      setNewCellData({ cellNumber: '', block: '', capacity: 1, type: 'Standard' });
      queryClient.invalidateQueries({ queryKey: ['cells'] });
    } catch (error: any) {
      setAddCellError(error.response?.data?.error || 'Failed to add cell');
    } finally {
      setIsAddingCell(false);
    }
  };

  const assignInmate = async () => {
    if (!assignCell) return;
    setAssignError('');
    setIsAssigning(true);
    try {
      await api.post(`/cells/${assignCell._id}/assign/`, { inmateId: assignInmateId });
      setShowAssignModal(false);
      queryClient.invalidateQueries({ queryKey: ['cells'] });
    } catch (error: any) {
      setAssignError(error.response?.data?.error || 'Failed to assign inmate');
    } finally {
      setIsAssigning(false);
    }
  };

  if (isLoading) return <p>Loading cells...</p>;
  if (error) return <p>Error loading cells</p>;

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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter by Block:</label>
          <select
            value={selectedBlock}
            onChange={(e) => setSelectedBlock(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="all">All Blocks</option>
            {blocks.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowAddCellModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Cell
        </button>
      </div>

      {/* Cells Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCells.map(cell => (
          <div key={cell._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
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

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Occupancy</span>
                <span className="text-sm font-medium text-gray-900">
                  {(cell.inmates ? cell.inmates.length : 0)}/{cell.capacity}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    getOccupancyLevel(cell.inmates, cell.capacity) === 'empty'
                      ? 'bg-gray-300'
                      : getOccupancyLevel(cell.inmates, cell.capacity) === 'partial'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${((cell.inmates ? cell.inmates.length : 0) / cell.capacity) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Current Inmates</h4>
              {cell.inmates && cell.inmates.length > 0 ? (
                <div className="space-y-1">
                  {cell.inmates.map((inmate) => (
                    <div key={inmate._id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <Users className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{inmate.firstName} {inmate.lastName} ({inmate.inmateId})</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No inmates assigned</p>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setAssignCell(cell);
                  setAssignInmateId('');
                  setAssignError('');
                  setShowAssignModal(true);
                }}
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

      {/* Add Cell Modal */}
      {showAddCellModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Cell</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="cellNumber"
                value={newCellData.cellNumber}
                onChange={handleNewCellChange}
                placeholder="Cell Number (e.g., A-101)"
                className="w-full px-3 py-2 border rounded"
              />
              <select
                name="block"
                value={newCellData.block}
                onChange={handleNewCellChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select Block</option>
                {blocks.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <input
                type="number"
                name="capacity"
                min={1}
                value={newCellData.capacity}
                onChange={handleNewCellChange}
                placeholder="Capacity"
                className="w-full px-3 py-2 border rounded"
              />
              <select
                name="type"
                value={newCellData.type}
                onChange={handleNewCellChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="Standard">Standard</option>
                <option value="Solitary">Solitary</option>
              </select>
              {addCellError && <p className="text-red-600 text-sm">{addCellError}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddCellModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={addCell}
                  disabled={isAddingCell}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isAddingCell ? 'Adding...' : 'Add Cell'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Inmate Modal */}
      {showAssignModal && assignCell && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Assign Inmate to Cell {assignCell.cellNumber}</h2>
            <input
              type="text"
              value={assignInmateId}
              onChange={(e) => setAssignInmateId(e.target.value)}
              placeholder="Enter Inmate ID"
              className="w-full px-3 py-2 border rounded mb-2"
            />
            {assignError && <p className="text-red-600 text-sm mb-2">{assignError}</p>}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={assignInmate}
                disabled={isAssigning || !assignInmateId.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isAssigning ? 'Assigning...' : 'Assign'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CellManagement;
