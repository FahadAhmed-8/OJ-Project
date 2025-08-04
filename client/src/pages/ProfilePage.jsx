// client/src/pages/ProfilePage.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="max-w-sm p-8 bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.username}!</h1>
                <p className="mt-2 text-gray-600">Your email: {user.email}</p>

                {/* 2. Add this link to the problems page */}
                <Link to="/problems">
                    <button className="w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        View Problems
                    </button>
                </Link>

                <button
                    onClick={handleLogout}
                    className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;