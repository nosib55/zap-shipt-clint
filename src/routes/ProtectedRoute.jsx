import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show a loader while checking auth state
  if (loading) {
    return <span className="loading loading-spinner text-error"></span>;
  }

  // If no user → redirect to login (preserve attempted location)
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User exists → render the page
  return children;
};

export default ProtectedRoute;
