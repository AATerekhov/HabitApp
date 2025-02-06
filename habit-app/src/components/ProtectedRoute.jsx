// ProtectedRoute.js v1.0
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;