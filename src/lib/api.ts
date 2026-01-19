import axios from 'axios';

const api = axios.create({
    baseURL: 'https://saiza.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // No backticks in string literal for now to be safe? No, wait, template literal is fine.
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
