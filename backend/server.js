// Tải môi trường dựa trên NODE_ENV
require('dotenv').config({
    path: process.env.NODE_ENV === 'production'
        ? '.env.production'
        : '.env.development'
});

const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const morgan = require('morgan'); // Nên cài thêm package này

const app = express();
const NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to MongoDB
connectDB();

// Middleware
// Cấu hình CORS theo môi trường
if (NODE_ENV === 'production') {
    // Trong production chỉ cho phép các origin cụ thể
    app.use(cors({
        origin: process.env.ALLOWED_ORIGINS?.split(',') || 'https://cooknchat.com',
        credentials: true
    }));
} else {
    // Development cho phép tất cả
    app.use(cors());
    // Logging chỉ trong môi trường development
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    // Error messages chi tiết hơn trong development
    if (NODE_ENV === 'development') {
        res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    } else {
        // Production chỉ trả message chung
        res.status(500).json({ message: 'Something went wrong!' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
});