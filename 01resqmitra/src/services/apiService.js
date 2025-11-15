import axios from 'axios';

// Create axios instance with base configuration
const APIWithAuth = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'),
  headers: {
    'Content-Type': 'application/json',
  },
});
const APIWithOutAuth = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'),
  headers: {
    'Content-Type': 'application/json',
  },
});

APIWithAuth.interceptors.request.use(
  (config) => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        const token = userData.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error parsing userData from localStorage:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

APIWithAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await APIWithAuth.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  register: async (userData) => {
    try {
      const response = await APIWithAuth.post('/user/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem('userData');
      return { success: true };
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await APIWithAuth.put(`/user/update`, profileData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export const emergencyAPI = {
  registerIncident: async (locationData) => {
    try {      
      const response = await APIWithAuth.post('/incident/register', locationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export const VolunteerAPI = {
  getIncidentByVolunteer: async () => {
    try {
      const response = await APIWithAuth.get('/incident/get/byvolunteer');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  acceptIncident: async (incidentId, volunteerId) => {
    try {
      const response = await APIWithAuth.post("/incident/volunteer/register", {
        incidentId,
        volunteerId,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  resolveIncident: async (incidentId) => {
    try {
      const response = await APIWithAuth.put(`/incident/resolve/${incidentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateLocation: async (locationData) => {
    try {
      const response = await APIWithAuth.put('/user/update/location', locationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export const AdminAPI = {
  getAllIncidents: async () => {
    try {
      const response = await APIWithAuth.get('/incident/get');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  getIncidentsByDate: async (data) => {
    try {
      const response = await APIWithAuth.post("/incident/get/data", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  getAllVolunteers: async () => {
    try {
      const response = await APIWithAuth.get('user/get/volunteer');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  searchVolunteer: async (keyword) => {
    try {
      const response = await APIWithAuth.get(`user/get/volunteer/search/${keyword}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
}

export default APIWithAuth;
