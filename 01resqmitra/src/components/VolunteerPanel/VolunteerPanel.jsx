import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { emergencyAPI } from '../../services/apiService';

function VolunteerPanel() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responding, setResponding] = useState(null);

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await emergencyAPI.getEmergencyAlerts();
      setAlerts(response.alerts || response || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch emergency alerts');
      console.error('Error fetching alerts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlerts();
    // Set up polling for new alerts every 30 seconds
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  const handleRespond = async (alertId, responseType) => {
    setResponding(alertId);
    
    try {
      await emergencyAPI.respondToEmergency(alertId, {
        response: responseType,
        volunteerId: user.id,
        timestamp: new Date().toISOString()
      });
      
      // Refresh alerts
      fetchAlerts();
    } catch (err) {
      setError(err.message || 'Failed to respond to emergency');
      console.error('Error responding to emergency:', err);
    } finally {
      setResponding(null);
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-800">Volunteer Dashboard</h1>
            <div className="text-sm text-gray-600">
              Welcome, {user?.name}
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-red-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Active Alerts</h3>
              <p className="text-3xl font-bold">
                {alerts.filter(alert => alert.status === 'active').length}
              </p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Responded Today</h3>
              <p className="text-3xl font-bold">5</p>
            </div>
            <div className="bg-blue-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Total Responses</h3>
              <p className="text-3xl font-bold">23</p>
            </div>
          </div>

          {/* Emergency Alerts */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Emergency Alerts</h2>
              <button
                onClick={fetchAlerts}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Refresh Alerts
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id || alert.timestamp} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {alert.severity || 'medium'} Priority
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          {new Date(alert.timestamp || Date.now()).toLocaleString()}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {alert.type || 'Emergency Alert'}
                      </h3>
                      
                      <p className="text-gray-600 mb-3">
                        {alert.description || 'Emergency assistance needed'}
                      </p>
                      
                      <div className="text-sm text-gray-500">
                        <p><strong>Location:</strong> {alert.location || 'Location not provided'}</p>
                        <p><strong>Distance:</strong> {alert.distance || 'Unknown'} km away</p>
                        <p><strong>Reported by:</strong> {alert.reportedBy || 'Anonymous'}</p>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex flex-col space-y-2">
                      {alert.status === 'active' && (
                        <>
                          <button
                            onClick={() => handleRespond(alert.id, 'responding')}
                            disabled={responding === alert.id}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition"
                          >
                            {responding === alert.id ? 'Responding...' : 'I\'m Responding'}
                          </button>
                          
                          <button
                            onClick={() => handleRespond(alert.id, 'unavailable')}
                            disabled={responding === alert.id}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 transition"
                          >
                            Can't Respond
                          </button>
                        </>
                      )}
                      
                      {alert.status === 'responded' && (
                        <div className="text-green-600 font-semibold">
                          ✓ Responded
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {alerts.length === 0 && !loading && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">🚨</div>
                <p className="text-lg">No emergency alerts at the moment.</p>
                <p className="text-sm">Stay ready to help when needed!</p>
              </div>
            )}
          </div>

          {/* Volunteer Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Volunteer Guidelines</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Always prioritize your safety first</li>
              <li>• Call emergency services (112) for serious medical emergencies</li>
              <li>• Provide basic first aid only if you are trained</li>
              <li>• Stay with the person until professional help arrives</li>
              <li>• Keep the emergency contact informed of the situation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VolunteerPanel;
