import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { UserCheck, Clock, Search, Plus, Calendar } from 'lucide-react';

type VisitorHistoryItem = {
  id: string;
  visitorName: string;
  visitorId: string;
  inmateName: string;
  inmateId: string;
  visitDate: string;
  visitTime: string;
  duration?: string;
  relationship: string;
  purpose: string;
  notes?: string;
  status: string;
};

const fetchVisitorHistory = async (): Promise<VisitorHistoryItem[]> => {
  const { data } = await api.get('/visitors/');
  return Array.isArray(data) ? data : [];
};

const VisitorLogging = () => {
  const [activeTab, setActiveTab] = useState<'log' | 'history'>('log');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    visitorName: '',
    visitorId: '',
    inmateId: '',
    visitDate: '',
    visitTime: '',
    relationship: '',
    purpose: '',
    notes: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  const { data: visitorHistory = [], isLoading, error } = useQuery({
    queryKey: ['visitorHistory'],
    queryFn: fetchVisitorHistory,
    initialData: [],
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      await api.post('/visitors/', formData);
      alert('Visitor logged successfully!');
      setFormData({
        visitorName: '',
        visitorId: '',
        inmateId: '',
        visitDate: '',
        visitTime: '',
        relationship: '',
        purpose: '',
        notes: ''
      });
      queryClient.invalidateQueries({ queryKey: ['visitorHistory'] });
    } catch (error: any) {
      if (error.response?.data) {
        const backendErrors = error.response.data;
        const parsedErrors: { [key: string]: string } = {};
        for (const key in backendErrors) {
          if (Array.isArray(backendErrors[key])) {
            parsedErrors[key] = backendErrors[key].join(' ');
          } else {
            parsedErrors[key] = backendErrors[key];
          }
        }
        setErrors(parsedErrors);
      } else {
        alert('Failed to log visitor. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredHistory = visitorHistory.filter((visit) =>
    visit.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.inmateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.inmateId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status.toLowerCase()) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'in-progress':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (isLoading) return <p>Loading visitor history...</p>;
  if (error) return <p>Error loading visitor history</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <UserCheck className="h-6 w-6 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Visitor Management</h1>
        </div>
        <p className="text-gray-600">Log visitor information and track visit history</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('log')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'log'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors`}
            >
              <div className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Log New Visit</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } transition-colors`}
            >
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Visit History</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'log' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Visitor Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visitor Name *</label>
                <input
                  type="text"
                  name="visitorName"
                  value={formData.visitorName}
                  onChange={handleFormChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.visitorName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter visitor's full name"
                />
                {errors.visitorName && <p className="text-red-600 text-xs mt-1">{errors.visitorName}</p>}
              </div>

              {/* Visitor ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visitor ID</label>
                <input
                  type="text"
                  name="visitorId"
                  value={formData.visitorId}
                  onChange={handleFormChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.visitorId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., V-2024-001"
                />
                {errors.visitorId && <p className="text-red-600 text-xs mt-1">{errors.visitorId}</p>}
              </div>

              {/* Inmate ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Inmate ID *</label>
                <input
                  type="text"
                  name="inmateId"
                  value={formData.inmateId}
                  onChange={handleFormChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.inmateId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., INM-2024-001"
                />
                {errors.inmateId && <p className="text-red-600 text-xs mt-1">{errors.inmateId}</p>}
              </div>

              {/* Relationship */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleFormChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.relationship ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select relationship</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="sibling">Sibling</option>
                  <option value="child">Child</option>
                  <option value="friend">Friend</option>
                  <option value="attorney">Attorney</option>
                  <option value="other">Other</option>
                </select>
                {errors.relationship && <p className="text-red-600 text-xs mt-1">{errors.relationship}</p>}
              </div>

              {/* Visit Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visit Date *</label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleFormChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.visitDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.visitDate && <p className="text-red-600 text-xs mt-1">{errors.visitDate}</p>}
              </div>

              {/* Visit Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Visit Time *</label>
                <input
                  type="time"
                  name="visitTime"
                  value={formData.visitTime}
                  onChange={handleFormChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.visitTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.visitTime && <p className="text-red-600 text-xs mt-1">{errors.visitTime}</p>}
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of Visit</label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleFormChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.purpose ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select purpose</option>
                  <option value="family-visit">Family Visit</option>
                  <option value="legal-consultation">Legal Consultation</option>
                  <option value="counseling">Counseling</option>
                  <option value="medical">Medical</option>
                  <option value="other">Other</option>
                </select>
                {errors.purpose && <p className="text-red-600 text-xs mt-1">{errors.purpose}</p>}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleFormChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
                    errors.notes ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter any additional notes about the visit..."
                />
                {errors.notes && <p className="text-red-600 text-xs mt-1">{errors.notes}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Logging...' : 'Log Visit'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by visitor name, inmate name, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Results Summary */}
              <p className="text-sm text-gray-600">
                Showing {filteredHistory.length} visit records
              </p>

              {/* Visit History Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visitor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Inmate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visit Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Relationship
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredHistory.map((visit) => (
                      <tr key={visit.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{visit.visitorName}</div>
                            <div className="text-sm text-gray-500">{visit.visitorId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{visit.inmateName}</div>
                            <div className="text-sm text-gray-500">{visit.inmateId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {visit.visitDate}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {visit.visitTime} {visit.duration ? `(${visit.duration})` : ''}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{visit.relationship}</div>
                          <div className="text-sm text-gray-500">{visit.purpose}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={getStatusBadge(visit.status)}>
                            {visit.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredHistory.length === 0 && (
                <div className="text-center py-12">
                  <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No visits found</h3>
                  <p className="text-gray-500">
                    {searchTerm ? 'Try adjusting your search criteria' : 'No visitor records have been logged yet'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorLogging;
