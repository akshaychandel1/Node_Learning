import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export const authService = {
    register: async (name, email, password, role) => {
        // role is optional; backend enforces whether it can be assigned
        const body = { name, email, password };
        if (role)
            body.role = role;
        const response = await api.post('/auth/register', body);
        return response.data;
    },
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
};
export const noteService = {
    getAllNotes: async () => {
        const response = await api.get('/notes');
        return response.data;
    },
    getNoteById: async (id) => {
        const response = await api.get(`/notes/${id}`);
        return response.data;
    },
    createNote: async (note) => {
        const response = await api.post('/notes', note);
        return response.data;
    },
    updateNote: async (id, note) => {
        const response = await api.put(`/notes/${id}`, note);
        return response.data;
    },
    deleteNote: async (id) => {
        const response = await api.delete(`/notes/${id}`);
        return response.data;
    },
};
export const userService = {
    getAllUsers: async () => {
        const response = await api.get('/users');
        return response.data;
    },
    getUserById: async (id) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },
    updateUser: async (id, user) => {
        const response = await api.put(`/users/${id}`, user);
        return response.data;
    },
    deleteUser: async (id) => {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    },
    setPermissions: async (id, role, permissions) => {
        const response = await api.patch(`/users/${id}/permissions`, { role, permissions });
        return response.data;
    },
};
export default api;
