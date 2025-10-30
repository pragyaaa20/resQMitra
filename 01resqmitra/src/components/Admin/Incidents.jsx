import React from 'react';
import { FaTachometerAlt, FaExclamationTriangle, FaBriefcaseMedical , FaHandsHelping    } from "react-icons/fa";


function Incidents() {
  return (

    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
     <aside className="w-64 bg-red-800 text-white flex flex-col justify-between">
             <div>
               <div className="px-6 py-4 text-3xl font-bold border-b border-gray-700  flex items-center gap-5 ">
                 <FaBriefcaseMedical />
                <span> resQMitra</span>
               </div>
               <nav className="mt-6">
                 <ul>
                   <li className="flex items-center gap-3 px-6 py-3 hover:bg-red-900 cursor-pointer">
                     <FaTachometerAlt />
                     <span>Dashboard</span>
                   </li>
                   <li className="flex items-center gap-3 px-6 py-3 hover:bg-red-900 cursor-pointer">
                     <FaExclamationTriangle />
                     <span>Incidents</span>
                   </li>
                   <li className="flex items-center gap-3 px-6 py-3 hover:bg-red-900 cursor-pointer">
                     <FaHandsHelping />
                     <span>Volunteer</span>
                   </li>
                   
                 </ul>
               </nav>
             </div>
             
           </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">INCIDENTS</h1>

        {/* Incident Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4">Incident Name</th>
                <th className="py-3 px-4">Incident ID</th>
                <th className="py-3 px-4">Resolved By</th>
              </tr>
            </thead>
            
          </table>
        </div>

        {/* Search Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Search Incidents by Date
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
             <label className="text-gray-600 font-medium mb-1" htmlFor="fromDate">
                From
            </label>
            <input
              type="date"
              placeholder="From"
              className="border border-gray-300 rounded-md p-2 w-48 focus:ring-2 focus:ring-red-500 outline-none"
            />
             <label className="text-gray-600 font-medium mb-1" htmlFor="fromDate">
                To
            </label>
            <input
              type="date"
              placeholder="To"
              className="border border-gray-300 rounded-md p-2 w-48 focus:ring-2 focus:ring-red-500 outline-none"
            />
            <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700">
              Search
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

  
export default Incidents