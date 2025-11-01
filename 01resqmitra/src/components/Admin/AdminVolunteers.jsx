import React from 'react'
import AdminSidebar from './AdminSidebar'

function AdminVolunteers() {
    const volunteers = [
    { id: "VOL001", name: "John Smith", email: "john@example.com", phone: "+1-234-567-8901", status: "Active", incidentsResolved: 5 },
    { id: "VOL002", name: "Sarah Johnson", email: "sarah@example.com", phone: "+1-234-567-8902", status: "Active", incidentsResolved: 3 },
    { id: "VOL003", name: "Mike Davis", email: "mike@example.com", phone: "+1-234-567-8903", status: "Inactive", incidentsResolved: 8 },
    { id: "VOL004", name: "Emily Brown", email: "emily@example.com", phone: "+1-234-567-8904", status: "Active", incidentsResolved: 12 },
    { id: "VOL005", name: "David Wilson", email: "david@example.com", phone: "+1-234-567-8905", status: "Active", incidentsResolved: 7 },
  ];

  const totalVolunteers = volunteers.length;
  const activeVolunteers = volunteers.filter(vol => vol.status === "Active").length;

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-10 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Volunteer Management</h2>

        {/* Volunteers Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-10">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-red-400 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Volunteer ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Incidents Resolved</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((volunteer) => (
                <tr key={volunteer.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{volunteer.id}</td>
                  <td className="px-6 py-4 text-gray-800">{volunteer.name}</td>
                  <td className="px-6 py-4 text-gray-800">{volunteer.email}</td>
                  <td className="px-6 py-4 text-gray-800">{volunteer.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      volunteer.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {volunteer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-800 text-center">{volunteer.incidentsResolved}</td>
                  <td className="px-6 py-4">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-xs mr-2">
                      Edit
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 text-xs">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Search Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Search Volunteers
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              className="border border-gray-300 rounded-md p-2 w-80 focus:ring-2 focus:ring-red-500 outline-none"
            />
            <select className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none">
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700">
              Search
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
              Add New Volunteer
            </button>
          </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Total Volunteers</h3>
            <p className="text-5xl font-bold text-red-600">{totalVolunteers}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Active Volunteers</h3>
            <p className="text-5xl font-bold text-green-600">{activeVolunteers}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminVolunteers;
