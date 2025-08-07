// client/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Main Links */}
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-xl font-bold text-white hover:text-gray-300">OnlineJudge</Link>
                        <Link to="/problems" className="text-gray-300 hover:text-white">Problems</Link>
                    </div>

                    {/* Right side links */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link to="/admin/dashboard" className="text-yellow-400 hover:text-yellow-300">Admin</Link>
                                )}
                                <Link to="/profile" className="text-gray-300 hover:text-white">{user.username}</Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md text-sm font-medium text-white"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
                                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium text-white">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;