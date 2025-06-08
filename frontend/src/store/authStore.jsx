// frontend/src/store/authStore.js
import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await axios.post('/api/users/login', { email, password });
            localStorage.setItem('token', data.token);
            set({ user: data, token: data.token, isLoading: false });
            return data;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Login failed',
                isLoading: false
            });
            throw error;
        }
    },

    register: async (username, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await axios.post('/api/users', {
                username,
                email,
                password
            });
            localStorage.setItem('token', data.token);
            set({ user: data, token: data.token, isLoading: false });
            return data;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Registration failed',
                isLoading: false
            });
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },

    clearError: () => set({ error: null }),
}));

export default useAuthStore;