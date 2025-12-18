import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://smart-campus-guide-backend.onrender.com/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for logging
apiClient.interceptors.request.use((config) => {
    console.log(`🚀 API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`, config.data || '');
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => {
        console.log(`✅ API Response from ${response.config.url}:`, response.data);
        return response.data;
    },
    (error) => {
        const url = error.config?.url || 'unknown';
        console.error(`❌ API Error [${url}]:`, error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;
