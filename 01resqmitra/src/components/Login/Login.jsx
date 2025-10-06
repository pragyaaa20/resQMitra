import React from 'react'

function Login() {
  return (
    <div className="bg-[#FFF5F7] flex justify-center items-center min-h-screen">
      <div className="bg-[#FFFFFF] rounded-lg p-8 shadow-2xl max-w-sm w-full">
        <h2 className="text-center text-3xl text-[#F75270] mb-6 font-bold">LOGIN</h2>
        
        <form>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">Email</label>
            <input 
              className="w-full px-3 py-2 bg-red-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email" 
              placeholder="Email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Password</label>
            <input  
              className="w-full px-3 py-2 bg-red-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
              type="password"
              placeholder="Password"
            />
          </div>

          {/* Submit Button */}
          <button 
            className="w-full bg-[#F75270] text-white rounded-md py-3 px-2 shadow-lg hover:bg-[#c93752] font-bold" 
            type="submit"
          >
            SUBMIT
          </button>

          {/* Register Input */}
          {/* <div>
            <input 
              className="w-full mt-5 py-3 rounded-lg text-gray-800 px-32 shadow-lg hover:bg-[#c93752] text-center cursor-pointer"
              type="button"
              value="REGISTER"
            />
          </div> */}
        </form>
      </div>
    </div>
  )
}

export default Login
