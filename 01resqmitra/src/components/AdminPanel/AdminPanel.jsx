import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { userAPI } from '../../services/apiService';

function AdminPanel() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState('all');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      if (selectedRole === 'all') {
        response = await userAPI.getAllUsers();
      } else {
        response = await userAPI.getUsersByRole(selectedRole);
      }
      setUsers(response.users || response || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedRole]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleStatusUpdate = async (userId, newStatus) => {
    try {
      await userAPI.updateUserStatus(userId, newStatus);
      // Refresh the users list
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Failed to update user status');
      console.error('Error updating user status:', err);
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
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="text-sm text-gray-600">
              Welcome, {user?.name}
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-3xl font-bold">{users.length}</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Active Volunteers</h3>
              <p className="text-3xl font-bold">
                {users.filter(u => u.role === 'Volunteer' && u.status === 'active').length}
              </p>
            </div>
            <div className="bg-yellow-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Emergency Alerts</h3>
              <p className="text-3xl font-bold">24</p>
            </div>
            <div className="bg-red-500 text-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold">Pending Approvals</h3>
              <p className="text-3xl font-bold">
                {users.filter(u => u.status === 'pending').length}
              </p>
            </div>
          </div>

          {/* User Management */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Users</option>
                <option value="User">Users</option>
                <option value="Volunteer">Volunteers</option>
                <option value="Admin">Admins</option>
              </select>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((userItem) => (
                    <tr key={userItem.id || userItem.email}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {userItem.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {userItem.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {userItem.phoneNum}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          userItem.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                          userItem.role === 'Volunteer' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {userItem.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          userItem.status === 'active' ? 'bg-green-100 text-green-800' :
                          userItem.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {userItem.status || 'active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {userItem.status !== 'active' && (
                            <button
                              onClick={() => handleStatusUpdate(userItem.id, 'active')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                          )}
                          {userItem.status !== 'suspended' && (
                            <button
                              onClick={() => handleStatusUpdate(userItem.id, 'suspended')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Suspend
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {users.length === 0 && !loading && (
              <div className="text-center py-8 text-gray-500">
                No users found for the selected role.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
