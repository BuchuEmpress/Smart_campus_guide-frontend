import apiClient from './apiClient';

const CACHE_KEY = 'smart_campus_offline_archive';
const LAST_SYNC_KEY = 'smart_campus_last_sync';

export const cacheService = {
    downloadArchive: async () => {
        try {
            const data = await apiClient.get('/cache/download');
            localStorage.setItem(CACHE_KEY, JSON.stringify(data));
            localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());
            return data;
        } catch (error) {
            console.error('Failed to download archive:', error);
            throw error;
        }
    },

    getOfflineLocations: () => {
        const cached = localStorage.getItem(CACHE_KEY);
        return cached ? JSON.parse(cached) : [];
    },

    searchOffline: (query) => {
        const locations = cacheService.getOfflineLocations();
        const lowerQuery = query.toLowerCase();
        return locations.filter(loc =>
            loc.name.toLowerCase().includes(lowerQuery) ||
            loc.description?.toLowerCase().includes(lowerQuery) ||
            loc.type?.toLowerCase().includes(lowerQuery)
        );
    },

    shouldSync: () => {
        const lastSync = localStorage.getItem(LAST_SYNC_KEY);
        if (!lastSync) return true;

        const lastDate = new Date(lastSync);
        const now = new Date();
        const hoursSinceSync = (now - lastDate) / (1000 * 60 * 60);
        return hoursSinceSync > 24; // Sync once a day
    }
};

export default cacheService;
