import apiClient from './apiClient';

export const topicService = {
    search: (query, department = null, limit = 10) => {
        const payload = { query, limit };
        if (department && department !== 'All') {
            payload.department = department;
        }
        return apiClient.post('/topics/search', payload);
    },

    suggest: (department, option, count = 5) => {
        return apiClient.post('/topics/ai/suggest', {
            department,
            option,
            count
        });
    },

    chat: (message, sessionId, department = null) => {
        const payload = {
            message,
            session_id: sessionId
        };
        if (department) {
            payload.department = department;
        }
        return apiClient.post('/topics/chat', payload);
    },

    getStatistics: () => {
        return apiClient.get('/topics/statistics');
    }
};

export default topicService;
