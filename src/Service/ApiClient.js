
import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
    baseURL: 'http://localhost:8081/api/v1',
    withCredentials: true,
});


apiClient.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('Token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === -203) {
            toast.error("Unauthorized access. Please login again.");
        } else {
            toast.error("An error occurred.");
        }
        return Promise.reject(error);
    }
);

export default apiClient;
