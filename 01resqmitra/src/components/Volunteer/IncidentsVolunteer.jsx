import React from 'react'
import { FaTachometerAlt, FaUser, FaExclamationTriangle } from "react-icons/fa";


function IncidentsVolunteer() {
    const incidents = [
    { id: "INC101", name: "Fire Accident", date: "2025-10-10" },
    { id: "INC102", name: "Flood Relief", date: "2025-10-15" },
    { id: "INC103", name: "Road Accident", date: "2025-10-25" },
  ];

  const totalIncidents = incidents.length;

  return (
  
    <div className="flex min-h-screen bg-gray-100 ">
      {/* Sidebar */}
      <aside className="w-64 bg-red-800 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-8">resQMitra</h1>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-2 hover:bg-red-600 p-2 rounded-md">
            <FaTachometerAlt /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-2 hover:bg-red-600 p-2 rounded-md">
            <FaUser /> Profile
          </a>
          <a href="#" className="flex items-center gap-2 hover:bg-red-600 p-2 rounded-md">
            <FaExclamationTriangle /> Incidents
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 ">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Incidents Resolved By You</h2>

        {/* Incident Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-10">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-red-400 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Incident ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Incident Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
                <tr key={incident.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{incident.id}</td>
                  <td className="px-6 py-4 text-gray-800">{incident.name}</td>
                  <td className="px-6 py-4 text-gray-600">{incident.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md ">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Total Incidents Covered</h3>
          <p className="text-5xl font-bold text-red-600">{totalIncidents}</p>
        </div>
      </main>
    </div>
  );
}

export default IncidentsVolunteer;