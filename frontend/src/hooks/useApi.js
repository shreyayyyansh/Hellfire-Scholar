import { useAuth } from '@clerk/react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function useApi() {
    const { getToken } = useAuth();

    async function apiFetch(path, options = {}) {
        const token = await getToken();
        const headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        };
        // Don't set Content-Type for FormData (browser sets it with boundary)
        if (!(options.body instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }
        const res = await fetch(`${API_URL}${path}`, {
            ...options,
            headers,
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({ error: 'Request failed' }));
            throw new Error(err.error || `HTTP ${res.status}`);
        }
        return res.json();
    }

    return { apiFetch, API_URL };
}
