import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';

function History() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    
    try {
      // Mock data for now - replace with actual API call
      const mockHistory = [
        {
          id: 1,
          type: 'SOS Alert',
          description: 'Medical emergency assistance',
          timestamp: '2025-01-20T10:30:00Z',
          status: 'Resolved',
          location: 'Downtown Area'
        },
        {
          id: 2,
          type: 'Volunteer Response',
          description: 'Responded to road accident',
          timestamp: '2025-01-19T15:45:00Z',
          status: 'Completed',
          location: 'Highway Junction'
        },
        {
          id: 3,
          type: 'SOS Alert',
          description: 'Fire emergency',
          timestamp: '2025-01-18T09:15:00Z',
          status: 'Resolved',
          location: 'Residential Area'
        }
      ];
      
      setHistory(mockHistory);
    } catch (err) {
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const filteredHistory = history.filter(item => {
    if (filter === 'all') return true;
    return item.type.toLowerCase().includes(filter.toLowerCase());
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Emergency History</h1>
            <div className="text-sm text-gray-600">
              User: {user?.name}
            </div>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Activities</option>
              <option value="sos">SOS Alerts</option>
              <option value="volunteer">Volunteer Responses</option>
            </select>
          </div>

          {/* History Timeline */}
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.type === 'SOS Alert' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.type}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.description}
                    </h3>
                    
                    <div className="text-sm text-gray-500">
                      <p><strong>Location:</strong> {item.location}</p>
                      <p><strong>Status:</strong> {item.status}</p>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.status === 'Resolved' || item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      item.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">📋</div>
              <p className="text-lg">No history found.</p>
              <p className="text-sm">Your emergency activities will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;
