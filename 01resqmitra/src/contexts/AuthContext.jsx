import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { authAPI } from '../services/apiService';

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  CLEAR_ERROR: 'CLEAR_ERROR',
  INITIALIZE_AUTH: 'INITIALIZE_AUTH',
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case AUTH_ACTIONS.INITIALIZE_AUTH:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: action.payload.isAuthenticated,
        isLoading: false,
      };

    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize authentication state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('user');

        if (token && userData) {
          const user = JSON.parse(userData);
          dispatch({
            type: AUTH_ACTIONS.INITIALIZE_AUTH,
            payload: {
              user,
              token,
              isAuthenticated: true,
            },
          });
        } else {
          dispatch({
            type: AUTH_ACTIONS.INITIALIZE_AUTH,
            payload: {
              user: null,
              token: null,
              isAuthenticated: false,
            },
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        dispatch({
          type: AUTH_ACTIONS.INITIALIZE_AUTH,
          payload: {
            user: null,
            token: null,
            isAuthenticated: false,
          },
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

    try {
      const response = await authAPI.login(credentials);
      
      // Assuming the API returns { user: {...}, token: "..." }
      const { user, token } = response;

      // Store in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user, token },
      });

      return { success: true, user };
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Register function
  const register = useCallback(async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });

    try {
      await authAPI.register(userData);
      
      dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS });
      
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      const errorMessage = error.message || 'Registration failed';
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  }, []);

  // Clear error function
  const clearError = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  }, []);

  // Check if user has specific role
  const hasRole = useCallback((role) => {
    return state.user?.role?.toLowerCase() === role.toLowerCase();
  }, [state.user?.role]);

  // Check if user is admin
  const isAdmin = useCallback(() => {
    return hasRole('admin');
  }, [hasRole]);

  // Check if user is volunteer
  const isVolunteer = useCallback(() => {
    return hasRole('volunteer');
  }, [hasRole]);

  // Check if user is regular user
  const isUser = useCallback(() => {
    return hasRole('user');
  }, [hasRole]);

  // Context value
  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
    hasRole,
    isAdmin,
    isVolunteer,
    isUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
