import React from 'react'
import { FaTachometerAlt, FaExclamationTriangle, FaBriefcaseMedical , FaHandsHelping    } from "react-icons/fa";

function WelcomeAdmin() {
  return (

    <div className="flex min-h-screen bg-gray-100 font-sans">
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
      <main className="flex-1 p-10 flex items-center justify-between bg-white">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to the resQMitra Admin Dashboard
          </h1>
          <p className="text-gray-600 max-w-md leading-relaxed text-xl">
            You have access to manage emergency reports, monitor responder
            activities, and oversee user operations. Use the panel on the left
            to navigate through different sections.
          </p>
        </div>
        <div>
          <img
            src="public\admin welcome.jpg"
            alt="Admin Illustration"
            className="w-80"
          />
        </div>
      </main>
    </div>
  );
}


export default WelcomeAdmin;