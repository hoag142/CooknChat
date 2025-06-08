import axios from 'axios';
import useAuthStore from '../store/authStore';

// Tạo instance Axios để thêm các cấu hình mặc định
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage khi component được render
        const token = localStorage.getItem('token');

        // Thêm token vào header nếu có
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Xử lý lỗi 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Đăng xuất người dùng nếu token không hợp lệ
            useAuthStore.getState().logout();

            // Chuyển hướng đến trang đăng nhập
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;