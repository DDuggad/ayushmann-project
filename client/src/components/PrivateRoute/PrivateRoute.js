import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../UI';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="private-route-loading">
        <LoadingSpinner message="Authenticating..." />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (role && user.role !== role) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = user.role === 'patient' ? '/patient/dashboard' : '/practitioner/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PrivateRoute;