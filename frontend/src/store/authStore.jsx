// frontend/src/store/authStore.js
import { create } from 'zustand';
import axios from '../utils/axiosConfig';

const useAuthStore = create((set, get) => ({
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,

    // Các chức năng hiện có
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

    // Thêm các chức năng mới
    fetchUserProfile: async () => {
        const token = get().token;
        if (!token) return null;

        set({ isLoading: true });
        try {
            const { data } = await axios.get('/api/users/profile');
            set({ user: { ...data, token }, isLoading: false });
            return data;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to fetch profile',
                isLoading: false
            });
            throw error;
        }
    },

    updateProfile: async (profileData) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await axios.put('/api/users/profile', profileData);
            set({ user: { ...data, token: get().token }, isLoading: false });
            return data;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to update profile',
                isLoading: false
            });
            throw error;
        }
    },

    checkAuth: async () => {
        const token = get().token;
        if (!token) return false;

        try {
            await get().fetchUserProfile();
            return true;
        } catch (error) {
            get().logout();
            return false;
        }
    }
}));

export default useAuthStore;