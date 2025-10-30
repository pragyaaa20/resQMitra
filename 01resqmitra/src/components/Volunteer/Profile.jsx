import React from 'react'
import { FaUserCircle } from "react-icons/fa"; 

function Profile() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFF5F7]">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        
        <div className="flex justify-center mb-6">
          <FaUserCircle className="text-gray-700 text-8xl" />
        </div>

        
        <form className="space-y-5">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full border bg-red-100 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border bg-red-100 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border bg-red-100 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border bg-red-100 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Profile