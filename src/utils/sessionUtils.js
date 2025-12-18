import { v4 as uuidv4 } from 'uuid';

const SESSION_KEY = 'smart_campus_session_id';

export const sessionUtils = {
    getSessionId: () => {
        let sessionId = localStorage.getItem(SESSION_KEY);
        if (!sessionId) {
            sessionId = uuidv4();
            localStorage.setItem(SESSION_KEY, sessionId);
        }
        return sessionId;
    },

    getCurrentLocation: () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        source: 'gps',
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    console.warn('Geolocation error:', error);
                    resolve(null); // Fallback to null (backend handles it)
                },
                { timeout: 10000 }
            );
        });
    }
};

export default sessionUtils;
