import React, { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { AdminAPI } from '../../services/apiService'

function AdminIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [keyword, setKeyword] = useState('');
  const [searching, setSearching] = useState(false);
  const [dateValidationError, setDateValidationError] = useState('');

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        const response = await AdminAPI.getAllIncidents();
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

  const totalIncidents = incidents.length;

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

  const validateDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) {
      return 'Please select both start and end dates';
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to end of today to allow today's date

    if (start > today) {
      return 'Start date cannot be in the future';
    }

    if (end > today) {
      return 'End date cannot be in the future';
    }

    if (start > end) {
      return 'End date cannot be earlier than start date';
    }
    
    return null;
  };

  const handleDateSearch = async () => {
    // If only keyword is provided (no dates), validate that at least keyword exists
    if (!keyword.trim() && (!startDate || !endDate)) {
      setError('Please provide search keyword or select both start and end dates');
      return;
    }

    // If dates are provided, validate them
    if ((startDate || endDate)) {
      const validationError = validateDateRange(startDate, endDate);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    try {
      setSearching(true);
      setError(null);
      
      const searchData = {};
      
      // Add dates if provided
      if (startDate && endDate) {
        searchData.startDate = startDate;
        searchData.endDate = endDate;
      }
      
      // Add keyword if provided
      if (keyword.trim()) {
        searchData.keyword = keyword.trim();
      }

      const response = await AdminAPI.getIncidentsByDate(searchData);
      
      if (response.status && response.data) {
        setIncidents(response.data);
      } else {
        setError('No incidents found for the specified criteria');
        setIncidents([]);
      }
    } catch (err) {
      console.error('Error searching incidents:', err);
      setError('Failed to search incidents');
    } finally {
      setSearching(false);
    }
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    setDateValidationError('');
    
    // Real-time validation if both dates are selected
    if (newStartDate && endDate) {
      const validationError = validateDateRange(newStartDate, endDate);
      if (validationError) {
        setDateValidationError(validationError);
      }
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    setDateValidationError('');
    
    // Real-time validation if both dates are selected
    if (startDate && newEndDate) {
      const validationError = validateDateRange(startDate, newEndDate);
      if (validationError) {
        setDateValidationError(validationError);
      }
    }
  };

  const handleResetSearch = async () => {
    setStartDate('');
    setEndDate('');
    setKeyword('');
    setError(null);
    setDateValidationError('');
    
    // Reload all incidents
    try {
      setLoading(true);
      const response = await AdminAPI.getAllIncidents();
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

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-10 bg-white">
        {/* Search Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Search Incidents
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search Keyword Input */}
            <input
              type="text"
              placeholder="Search by incident ID, status, or location..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleDateSearch()}
              className="border border-gray-300 rounded-md p-3 w-80 focus:ring-2 focus:ring-red-500 outline-none"
            />
            
            {/* Start Date with Floating Label */}
            <div className="relative">
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                max={endDate ? (endDate <= new Date().toISOString().split('T')[0] ? endDate : new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0]}
                placeholder=" "
                className={`peer border rounded-md p-3 w-48 focus:ring-2 outline-none ${
                  dateValidationError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              <label 
                htmlFor="startDate"
                className="absolute text-sm text-gray-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
              >
                Start Date
              </label>
            </div>

            {/* End Date with Floating Label */}
            <div className="relative">
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                min={startDate || undefined}
                max={new Date().toISOString().split('T')[0]}
                placeholder=" "
                className={`peer border rounded-md p-3 w-48 focus:ring-2 outline-none ${
                  dateValidationError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              <label 
                htmlFor="endDate"
                className="absolute text-sm text-gray-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3"
              >
                End Date
              </label>
            </div>
            <button 
              onClick={handleDateSearch}
              disabled={searching || !!dateValidationError}
              className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed"
            >
              {searching ? 'Searching...' : 'Search'}
            </button>
            <button 
              onClick={handleResetSearch}
              disabled={loading}
              className="bg-gray-600 text-white px-8 py-3 rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed height[52px]"
            >
              {loading ? 'Loading...' : 'Reset'}
            </button>
          </div>
          
          {/* Help Text */}
          <div className="mt-3 text-sm text-gray-600">
            <p>You can search by keyword alone, date range alone, or combine both for more specific results.</p>
          </div>
          
          {/* Date Validation Error */}
          {dateValidationError && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {dateValidationError}
              </div>
            </div>
          )}
        </div>

        {/* Summary Section */}
        {!loading && !error && (
          <div className="bg-gradient-to-r from-red-50 to-green-50 shadow-lg rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-700 mb-1">Total Incidents</h3>
                  <p className="text-3xl font-bold text-gray-800">{totalIncidents}</p>
                </div>
                
                <div className="h-12 w-px bg-gray-300"></div>
                
                <div className="text-center">
                  <h4 className="text-sm font-medium text-red-700 mb-1">Active</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <p className="text-2xl font-bold text-red-600">
                      {incidents.filter(incident => incident.status === 'ACTIVE').length}
                    </p>
                  </div>
                </div>
                
                <div className="h-12 w-px bg-gray-300"></div>
                
                <div className="text-center">
                  <h4 className="text-sm font-medium text-green-700 mb-1">Resolved</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <p className="text-2xl font-bold text-green-600">
                      {incidents.filter(incident => incident.status === 'RESOLVED').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-1">Status Distribution</div>
                <div className="flex space-x-1">
                  <div 
                    className="h-2 bg-red-500 rounded"
                    style={{
                      width: `${totalIncidents > 0 ? (incidents.filter(incident => incident.status === 'ACTIVE').length / totalIncidents) * 60 : 0}px`
                    }}
                  ></div>
                  <div 
                    className="h-2 bg-green-500 rounded"
                    style={{
                      width: `${totalIncidents > 0 ? (incidents.filter(incident => incident.status === 'RESOLVED').length / totalIncidents) * 60 : 0}px`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

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

        {/* Incident Table */}
        {!loading && !error && (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-10">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-red-400 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Incident ID</th>
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
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      No incidents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminIncidents;
