// frontend/vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Cấu hình dựa trên môi trường
export default defineConfig(({ command, mode }) => {
    // Tải biến môi trường dựa trên mode (development/production)
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [react()],
        server: {
            port: 3000,
            // Proxy chỉ hoạt động trong môi trường development
            proxy: mode === 'development' ? {
                '/api': {
                    target: env.VITE_API_URL || 'http://localhost:5000',
                    changeOrigin: true,
                },
            } : {},
        },
        // Hiển thị thông tin môi trường khi khởi động
        define: {
            __APP_ENV__: JSON.stringify(env.VITE_ENV),
        },
        // Cấu hình dev tools
        build: {
            sourcemap: mode === 'development',
        },
    };
});