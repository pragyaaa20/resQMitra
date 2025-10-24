import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles = [], requireAuth = true }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to login with the current location to return after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required
  if (allowedRoles.length > 0 && isAuthenticated) {
    const userRole = user?.role?.toLowerCase();
    const hasAllowedRole = allowedRoles.some(role => role.toLowerCase() === userRole);
    
    if (!hasAllowedRole) {
      // Redirect to unauthorized page or home based on role
      if (userRole === 'admin') {
        return <Navigate to="/admin" replace />;
      } else if (userRole === 'volunteer') {
        return <Navigate to="/volunteer" replace />;
      } else {
        return <Navigate to="/home" replace />;
      }
    }
  }

  // If all checks pass, render the children
  return children;
};

export default ProtectedRoute;
