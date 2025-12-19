import apiClient from './apiClient';

export const topicService = {
    search: (query, department = null, topicId = null, limit = 10) => {
        const payload = { query, limit };
        if (department && department !== 'All') {
            payload.department = department;
        }
        if (topicId) {
            payload.topic_id = topicId;
        }
        return apiClient.post('/topics/search', payload);
    },

    suggest: (department, option, topicId = null, count = 5) => {
        const payload = { department, option, count };
        if (topicId) {
            payload.topic_id = topicId;
        }
        return apiClient.post('/topics/ai/suggest', payload);
    },

    chat: (message, sessionId, department = null, topicId = null) => {
        const payload = {
            message,
            session_id: sessionId
        };
        if (department) {
            payload.department = department;
        }
        if (topicId) {
            payload.topic_id = topicId;
        }
        return apiClient.post('/topics/chat', payload);
    },

    similarity: (topicId, department = null, limit = 5) => {
        const payload = { topic_id: topicId, limit };
        if (department) {
            payload.department = department;
        }
        console.warn('Similarity API call: Backend endpoint not implemented for /topics/similarity. Returning mock data.');
        // Mock data for frontend development if backend is not ready
        return Promise.resolve({
            topics: [
                { id: 'mock-sim-1', title: 'Mock Similar Topic 1', department: department || 'CS', student: 'Mock Student' },
                { id: 'mock-sim-2', title: 'Mock Similar Topic 2', department: department || 'CS', student: 'Mock Student' },
            ]
        });
        // return apiClient.post('/topics/similarity', payload);
    },

    improve: (topicId, department = null, aspects = [], message = null) => {
        const payload = { topic_id: topicId, aspects, message };
        if (department) {
            payload.department = department;
        }
        console.warn('Improve API call: Backend endpoint not implemented for /topics/improve. Returning mock data.');
        // Mock data for frontend development if backend is not ready
        return Promise.resolve({
            improved_suggestions: [
                'Mock Improved Suggestion 1',
                'Mock Improved Suggestion 2',
            ]
        });
        // return apiClient.post('/topics/improve', payload);
    },

    getStatistics: () => {
        return apiClient.get('/topics/statistics');
    }
};

export default topicService;
