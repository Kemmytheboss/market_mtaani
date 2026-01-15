import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5555',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        // If you were using JWT, you'd add it here. 
        // For now we might just have user data in local storage.
        // If the backend expects Authorization header:
        // if (token) { config.headers.Authorization = `Bearer ${token}`; }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
