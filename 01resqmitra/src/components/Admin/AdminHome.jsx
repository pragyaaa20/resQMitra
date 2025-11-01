import React from 'react'
import AdminSidebar from './AdminSidebar'

function AdminHome() {
  return (
     <div className="flex min-h-screen bg-gray-100 font-sans">
          {/* Sidebar */}
          <AdminSidebar />
    
          {/* Main Content */}
          <main className="flex-1 flex items-center justify-between bg-white px-20 py-16">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                 Welcome to the resQMitra Admin Dashboard
              </h1>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                You have access to manage emergency reports, monitor responder
                activities, and oversee user operations. Use the panel on the left
                to navigate through different sections.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                You're now in control of a system that believes in helping, healing, and hope.
              </p>
             </div>

             <div className="flex justify-center">
              <img
                src="/admin welcome.jpg"
                alt="Admin Illustration"
                className="w-96 h-auto rounded-2xl shadow-md object-contain"/>
            </div>
            </main>
        </div>
  )
}

export default AdminHome
