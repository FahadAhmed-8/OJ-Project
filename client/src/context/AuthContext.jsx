// client/src/context/AuthContext.jsx
import React, { useState, useEffect } from 'react';
import authService from '../api/auth.service';
// Import the context object from your hook file
import { AuthContext } from '../hooks/useAuth';

// This file now only exports the AuthProvider component.
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        const userData = await authService.login(email, password);
        setUser(userData);
        return userData;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    // The value provided to the context
    const value = { user, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};