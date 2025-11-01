import React from 'react'
import VolunteerSidebar from './VolunteerSidebar'

function VolunteerHome() {
  return (
     <div className="flex min-h-screen bg-gray-100 font-sans">
          {/* Sidebar */}
          <VolunteerSidebar />
    
          {/* Main Content */}
          <main className="flex-1 flex items-center justify-between bg-white px-20 py-16">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                 Welcome Volunteer
              </h1>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Thank you for being a part of ResqMitra’s mission to save lives and support communities in times of emergency.
              Your dedication and time make a real difference. Explore your dashboard to view incidents, manage your activities, and stay updated on ongoing operations.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                You’re now part of a community that believes in helping, healing, and hope.
              </p>
             </div>

             <div className="flex justify-center">
              <img
                src="/volunteer.jpg"
                alt="Volunteer Illustration"
                className="w-96 h-auto rounded-2xl shadow-md object-contain"/>
            </div>
            </main>
        </div>
  )
}

export default VolunteerHome