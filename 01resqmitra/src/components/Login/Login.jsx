import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated, error, clearError, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/home';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      if (user.role?.toLowerCase() === 'admin') {
        navigate('/admin', { replace: true });
      } else if (user.role?.toLowerCase() === 'volunteer') {
        navigate('/volunteer', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, from]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await login(formData);
      
      if (result.success) {
        // Navigation will be handled by useEffect above
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFF5F7] flex justify-center items-center min-h-screen">
      <div className="bg-[#FFFFFF] rounded-lg p-8 shadow-2xl max-w-sm w-full">
        <h2 className="text-center text-3xl text-[#F75270] mb-6 font-bold">LOGIN</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
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

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-800 mb-2">Password</label>
            <input  
              className="w-full px-3 py-2 bg-red-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={isSubmitting}
            />
          </div>

          <button 
            className="w-full bg-[#F75270] text-white rounded-md py-3 px-2 shadow-lg hover:bg-[#c93752] font-bold disabled:opacity-50 disabled:cursor-not-allowed" 
            type="submit"
            disabled={isSubmitting || !formData.email || !formData.password}
          >
            {isSubmitting ? 'LOGGING IN...' : 'LOGIN'}
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-[#F75270] hover:underline font-semibold"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
