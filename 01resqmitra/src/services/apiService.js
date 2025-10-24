import axios from 'axios';

// Create axios instance with base configuration
const API = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear localStorage and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await API.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await API.post('/user/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      return { success: true };
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await API.get('/user/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Refresh token (if your backend supports it)
  refreshToken: async () => {
    try {
      const response = await API.post('/auth/refresh');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// User management API calls (for admin)
export const userAPI = {
  // Get all users (admin only)
  getAllUsers: async () => {
    try {
      const response = await API.get('/admin/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get users by role
  getUsersByRole: async (role) => {
    try {
      const response = await API.get(`/admin/users/role/${role}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Update user status
  updateUserStatus: async (userId, status) => {
    try {
      const response = await API.put(`/admin/users/${userId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// Emergency/SOS API calls
export const emergencyAPI = {
  // Send SOS alert
  sendSOS: async (emergencyData) => {
    try {
      const response = await API.post('/emergency/sos', emergencyData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Register incident with location (no auth required for emergency)
  registerIncident: async (locationData) => {
    try {
      // Create a separate axios instance without auth for emergency calls
      const emergencyAPI = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const response = await emergencyAPI.post('/incident/register', locationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get emergency alerts (for volunteers)
  getEmergencyAlerts: async () => {
    try {
      const response = await API.get('/volunteer/alerts');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Respond to emergency
  respondToEmergency: async (emergencyId, response) => {
    try {
      const response_data = await API.post(`/emergency/${emergencyId}/respond`, response);
      return response_data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default API;
