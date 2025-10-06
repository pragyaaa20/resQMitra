import React from 'react'

function Register() {
  return (
    <div className="bg-[#FFF5F7] flex justify-center items-center min-h-screen">
      <div className="bg-[#FFFFFF] rounded-lg p-8 shadow-2xl max-w-md w-full">
        <h2 className="text-center text-3xl text-[#F75270] mb-6 font-bold">VOLUNTEER REGISTER</h2>

        <form>
         
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">Full Name</label>
            <input
              className="w-full px-3 py-2 bg-red-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">Email</label>
            <input
              className="w-full px-3 py-2 bg-red-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">Phone Number</label>
            <input
              className="w-full px-3 py-2 bg-red-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>

          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">Password</label>
            <input
              className="w-full px-3 py-2 bg-red-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Create a password"
            />
          </div>

          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-800 mb-2">Confirm Password</label>
            <input
              className="w-full px-3 py-2 bg-red-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Confirm your password"
            />
          </div>

          
          <button
            className="w-full bg-[#F75270] text-white rounded-md py-3 px-2 shadow-lg hover:bg-[#c93752] font-bold"
            type="submit"
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
