// client/src/api/auth.service.js
import axios from 'axios';
const API_URL = '/api/auth/'; // Vite proxy will handle this

const register = (username, email, password) => {
    return axios.post(API_URL + 'register', { username, email, password });
};

const login = (email, password) => {
    return axios.post(API_URL + 'login', { email, password })
        .then(response => {
            if (response.data.token) {
                // Store user details and JWT in local storage
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

// You can add more functions here, e.g., to get a protected profile
const getProfile = (token) => {
    return axios.get(API_URL + 'profile', {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export default { register, login, logout, getProfile };