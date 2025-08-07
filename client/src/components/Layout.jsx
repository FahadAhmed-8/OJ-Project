// client/src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen">
            <Navbar />
            <Toaster position="top-center" />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
