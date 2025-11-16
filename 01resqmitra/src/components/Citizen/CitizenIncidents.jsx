import React, { useState, useEffect } from 'react'
import { CitizenAPI } from '../../services/apiService'

function CitizenIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        const response = await CitizenAPI.getIncidentByCitizen();
        if (response.status && response.data) {
          setIncidents(response.data);
        } else {
          setError('Failed to fetch incidents');
        }
      } catch (err) {
        console.error('Error fetching incidents:', err);
        setError('Failed to load incidents');
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const generateGoogleMapsLink = (latitude, longitude) => {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  };



  const totalIncidents = incidents.length;
  const activeIncidents = incidents.filter(incident => incident.status === 'ACTIVE').length;
  const resolvedIncidents = incidents.filter(incident => incident.status === 'RESOLVED').length;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
              <div className="text-lg text-gray-600">Loading...</div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Summary Section */}
        {!loading && !error && (
          <div className="bg-gradient-to-r from-red-50 to-green-50 shadow-lg rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-700 mb-1">Total Reports</h3>
                  <p className="text-3xl font-bold text-gray-800">{totalIncidents}</p>
                </div>
                
                <div className="h-12 w-px bg-gray-300"></div>
                
                <div className="text-center">
                  <h4 className="text-sm font-medium text-red-700 mb-1">Active</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <p className="text-2xl font-bold text-red-600">{activeIncidents}</p>
                  </div>
                </div>
                
                <div className="h-12 w-px bg-gray-300"></div>
                
                <div className="text-center">
                  <h4 className="text-sm font-medium text-green-700 mb-1">Resolved</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <p className="text-2xl font-bold text-green-600">{resolvedIncidents}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-1">Status Distribution</div>
                <div className="flex space-x-1">
                  <div 
                    className="h-2 bg-red-500 rounded"
                    style={{
                      width: `${totalIncidents > 0 ? (activeIncidents / totalIncidents) * 60 : 0}px`
                    }}
                  ></div>
                  <div 
                    className="h-2 bg-green-500 rounded"
                    style={{
                      width: `${totalIncidents > 0 ? (resolvedIncidents / totalIncidents) * 60 : 0}px`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Incidents Table */}
        {!loading && !error && (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-10">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-red-400 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Incident ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Date Created</th>
                </tr>
              </thead>
              <tbody>
                {incidents.length > 0 ? (
                  incidents.map((incident) => (
                    <tr key={incident.incidentId} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-800">{incident.incidentId.toString().padStart(3, '0')}</td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="max-w-xs">
                          <p className="truncate" title={incident.description}>
                            {incident.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          incident.status === 'ACTIVE' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {incident.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex flex-col">
                          <a 
                            href={generateGoogleMapsLink(incident.latitude, incident.longitude)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-sm inline-flex items-center"
                            title="Open location in Google Maps"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            View on Map
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{formatDate(incident.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-lg font-medium text-gray-600 mb-2">No emergency reports yet</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Emergency Tips */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-yellow-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Remember</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• <strong>Life-threatening emergencies:</strong> Call 112 immediately</li>
                <li>• <strong>Provide accurate location:</strong> Help responders find you quickly</li>
                <li>• <strong>Stay safe:</strong> Don't put yourself in danger while reporting</li>
                <li>• <strong>Follow up:</strong> Be available to answer calls from emergency responders</li>
              </ul>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default CitizenIncidents;
