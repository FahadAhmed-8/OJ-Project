// client/src/components/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoute = () => {
    const { user } = useAuth();

    // --- Start of Debugging Code ---
    console.log("--- AdminRoute Check ---");
    console.log("User object from useAuth():", user);

    if (user) {
        console.log("Value of user.role:", user.role);
        console.log("Is user.role === 'admin'?", user.role === 'admin');
    }

    const isAdmin = user && user.token && user.role === 'admin';
    console.log("Final 'isAdmin' result:", isAdmin);
    console.log("------------------------");
    // --- End of Debugging Code ---

    return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;