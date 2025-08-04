// client/src/api/question.service.js
import axios from 'axios';

const API_URL = '/api/questions/';

// Helper to get the auth token from local storage
const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

// Fetch all questions (public)
const getAllQuestions = () => {
    return axios.get(API_URL);
};

const getQuestionById = (id) => {
    return axios.get(API_URL + id);
};

// Create a new question (admin only)
const createQuestion = (questionData) => {
    return axios.post(API_URL, questionData, { headers: getAuthHeader() });
};

// Update a question (admin only)
const updateQuestion = (id, questionData) => {
    return axios.put(API_URL + id, questionData, { headers: getAuthHeader() });
};

// Delete a question (admin only)
const deleteQuestion = (id) => {
    return axios.delete(API_URL + id, { headers: getAuthHeader() });
};

const questionService = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
};

export default questionService;