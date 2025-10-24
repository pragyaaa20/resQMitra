import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNum: '',
    password: '',
    confirmPassword: '',
    role: 'User'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { register, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return 'Name is required';
    }
    if (!formData.email.trim()) {
      return 'Email is required';
    }
    if (!formData.phoneNum.trim()) {
      return 'Phone number is required';
    }
    if (formData.phoneNum.length !== 10) {
      return 'Phone number must be 10 digits';
    }
    if (!formData.password) {
      return 'Password is required';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare data for API (exclude confirmPassword)
      const { confirmPassword: _, ...registrationData } = formData;
      
      const result = await register(registrationData);
      
      if (result.success) {
        setShowSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phoneNum: '',
          password: '',
          confirmPassword: '',
          role: 'User'
        });
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-[#FFF5F7] flex justify-center items-center min-h-screen">
        <div className="bg-[#FFFFFF] rounded-lg p-8 shadow-2xl max-w-md w-full text-center">
          <div className="text-green-600 text-4xl mb-4">✓</div>
          <h2 className="text-2xl text-green-600 mb-4 font-bold">Registration Successful!</h2>
          <p className="text-gray-600 mb-4">
            Your account has been created successfully. You will be redirected to login page.
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF5F7] flex justify-center items-center min-h-screen py-8">
      <div className="bg-[#FFFFFF] rounded-lg p-8 shadow-2xl max-w-md w-full">
        <h2 className="text-center text-3xl text-[#F75270] mb-6 font-bold">REGISTER</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">Full Name</label>
            <input
              className="w-full px-3 py-2 bg-red-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">Email</label>
            <input
              className="w-full px-3 py-2 bg-red-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">Phone Number</label>
            <input
              className="w-full px-3 py-2 bg-red-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="tel"
              name="phoneNum"
              value={formData.phoneNum}
              onChange={handleChange}
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
              maxLength="10"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">Role</label>
            <select
              className="w-full px-3 py-2 bg-red-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            >
              <option value="User">User</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-2">Password</label>
            <input
              className="w-full px-3 py-2 bg-red-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min 6 characters)"
              minLength="6"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-800 mb-2">Confirm Password</label>
            <input
              className="w-full px-3 py-2 bg-red-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            className="w-full bg-[#F75270] text-white rounded-md py-3 px-2 shadow-lg hover:bg-[#c93752] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'REGISTERING...' : 'REGISTER'}
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-[#F75270] hover:underline font-semibold"
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
