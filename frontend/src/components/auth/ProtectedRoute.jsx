import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = false; // Replace with your actual auth logic
  const loading = false; // Example loading state
  const location = useLocation();

  if (loading) {
    // You can add a loading spinner here if you want
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
