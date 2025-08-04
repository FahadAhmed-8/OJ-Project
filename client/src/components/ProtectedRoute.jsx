// client/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
    const { user } = useAuth();

    // If a user is logged in, render the child component (via <Outlet />)
    // Otherwise, redirect them to the /login page
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;