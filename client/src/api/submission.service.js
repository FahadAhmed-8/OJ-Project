// client/src/api/submission.service.js
import axios from 'axios';

const API_URL = '/api/submit/';

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

const submitCode = (submissionData) => {
    return axios.post(API_URL, submissionData, { headers: getAuthHeader() });
};

const submissionService = {
    submitCode,
};

export default submissionService;