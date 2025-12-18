import apiClient from './apiClient';

export const navigationService = {
    search: (query) => {
        return apiClient.post('/navigation/search', { query });
    },

    navigate: (query, userLocation, travelMode = 'walking') => {
        return apiClient.post('/navigation/navigate', {
            query,
            user_location: userLocation,
            travel_mode: travelMode
        });
    },

    chat: (message, sessionId, userLocation = null) => {
        const payload = {
            message,
            session_id: sessionId
        };
        if (userLocation) {
            payload.user_location = userLocation;
        }
        return apiClient.post('/navigation/chat', payload);
    }
};

export default navigationService;
