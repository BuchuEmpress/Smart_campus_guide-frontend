import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://smart-campus-guide-backend.onrender.com/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for logging and user_location validation
apiClient.interceptors.request.use((config) => {
    console.log(`🚀 API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`, config.data || '');

    // Validate user_location for navigation and chat requests
    if (config.url.includes('/chat') || config.url.includes('/navigation/navigate')) {
        const userLocation = config.data?.user_location;
        if (!userLocation || typeof userLocation.lat !== 'number' || typeof userLocation.lon !== 'number') {
            console.warn(`⚠️ Warning: Request to ${config.url} is missing valid user_location (lat/lon numbers). Received:`, userLocation);
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => {
        console.log(`✅ API Response from ${response.config.url}:`, JSON.stringify(response.data, null, 2));
        return response.data;
    },
    (error) => {
        const url = error.config?.url || 'unknown';
        console.error(`❌ API Error [${url}]:`, error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;
