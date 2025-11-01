import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles = [], requireAuth = true }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return;
  }
  
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }
  if (allowedRoles.length > 0 && isAuthenticated) {
    const userRole = user?.role;
    const hasAllowedRole = allowedRoles.some(role => 
      role.toLowerCase() === userRole?.toLowerCase()
    );
    if (!hasAllowedRole) {
      return <Navigate to="/home" replace />;
    }
  }
  
  return children;
};

export default ProtectedRoute;
