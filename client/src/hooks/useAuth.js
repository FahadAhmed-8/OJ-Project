// client/src/hooks/useAuth.js
import { createContext, useContext } from 'react';

// 1. Create and export the Context object here
export const AuthContext = createContext(null);

// 2. Create and export the custom hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};