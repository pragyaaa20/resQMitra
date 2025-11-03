import React, { useState, useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa"
import VolunteerSidebar from './VolunteerSidebar'
import { useAuth } from '../../hooks/useAuth'
import { authAPI } from '../../services/apiService'

function VolunteerProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNum: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phoneNum: user.phone || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear message when user starts typing
    if (message) {
      setMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Validate form data
      if (!formData.name.trim()) {
        setMessage('Name is required');
        return;
      }
      if (!formData.email.trim()) {
        setMessage('Email is required');
      }
      if (!formData.phoneNum.trim()) {
        setMessage('Phone number is required');
        return;
      }
      if (formData.phoneNum.length !== 10) {
        setMessage('Phone number must be 10 digits');
        return;
      }

      // Make API call to update profile
      const response = await authAPI.updateProfile(formData);
      
      if (response.status || response.success) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage(response.message || 'Failed to update profile. Please try again.');
      }
      
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = error.message || error.error || 'Failed to update profile. Please try again.';
      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <VolunteerSidebar />
      
      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center px-6 py-8">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        
        <div className="flex justify-center mb-6">
          <FaUserCircle className="text-gray-700 text-8xl" />
        </div>

        
        {message && (
          <div className={`mb-4 p-3 rounded-md text-center ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-700 border border-green-400' 
              : 'bg-red-100 text-red-700 border border-red-400'
          }`}>
            {message}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border bg-red-100 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border bg-red-100 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNum"
              value={formData.phoneNum}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border bg-red-100 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 outline-none"
              disabled={isSubmitting}
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
        </div>
      </main>
    </div>
  );
}

export default VolunteerProfile