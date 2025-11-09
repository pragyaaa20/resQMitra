import React, { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { AdminAPI } from '../../services/apiService'

function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Fetch all volunteers on component mount
  useEffect(() => {
    fetchAllVolunteers();
  }, []);

  const fetchAllVolunteers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await AdminAPI.getAllVolunteers();
      if (response.status) {
        setVolunteers(response.data);
      } else {
        setError(response.message || 'Failed to fetch volunteers');
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      setError(error.message || 'Failed to fetch volunteers');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      // If no search keyword, fetch all volunteers
      fetchAllVolunteers();
      return;
    }

    try {
      setIsSearching(true);
      setError(null);
      const response = await AdminAPI.searchVolunteer(searchKeyword.trim());
      if (response.status) {
        setVolunteers(response.data);
      } else {
        setError(response.message || 'No volunteers found');
      }
    } catch (error) {
      console.error('Error searching volunteers:', error);
      setError(error.message || 'Failed to search volunteers');
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchKeyword('');
    fetchAllVolunteers();
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-10 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Volunteer Management</h2>

        {/* Search Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Search Volunteers
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="border border-gray-300 rounded-md p-2 w-80 focus:ring-2 focus:ring-red-500 outline-none"
            />
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
            <button 
              onClick={handleClearSearch}
              className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Loading Display */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <span className="ml-2">Loading volunteers...</span>
          </div>
        ) : (
          /* Volunteers Table */
          <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-10">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-red-400 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.length > 0 ? (
                  volunteers.map((volunteer, index) => (
                    <tr key={volunteer.email || index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-800">{volunteer.name}</td>
                      <td className="px-6 py-4 text-gray-800">{volunteer.email}</td>
                      <td className="px-6 py-4 text-gray-800">{volunteer.phone}</td>
                      <td className="px-6 py-4 text-gray-800">{volunteer.role}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          volunteer.status?.toUpperCase() === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {volunteer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        {volunteer.latitude && volunteer.longitude 
                          ? `${volunteer.latitude}, ${volunteer.longitude}` 
                          : 'Not Available'
                        }
                      </td>
                      <td className="px-6 py-4">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-xs mr-2">
                          Edit
                        </button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 text-xs">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No volunteers found
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

export default AdminVolunteers;
