import axios from 'axios';

const API_URL = 'http://localhost:5297/api';

const apiService = {
    getQuestions: () => axios.get(`${API_URL}/example`),
    // other API calls
};

export default apiService;
