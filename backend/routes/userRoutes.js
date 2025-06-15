const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth'); // Giả sử middleware auth được đặt ở đây

// Đường dẫn quan trọng
router.post('/', userController.registerUser); // Đăng ký: POST /api/users
router.post('/login', userController.loginUser); // Đăng nhập: POST /api/users/login
router.get('/profile', protect, userController.getUserProfile); // Profile: GET /api/users/profile

module.exports = router;