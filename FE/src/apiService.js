import axios from 'axios';

const API_URL = 'http://localhost:5297/api';

const apiService = {
    getExampleData: () => axios.get(`${API_URL}/example`),
    // other API calls
};

export default apiService;
