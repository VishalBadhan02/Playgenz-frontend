import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PublicRouteProps {
  restricted?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ restricted = false }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  // If authenticated and the route is restricted, redirect to home
  if (isAuthenticated && restricted) {
    return <Navigate to="/home" replace />;
  }

  // Otherwise, render the public content
  return <Outlet />;
};

export default PublicRoute;
