// backend/controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const userService = require('../service/userService');

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    try {
        const userData = await userService.registerUser(req.body);
        res.status(201).json(userData);
    } catch (error) {
        res.status(error.statusCode || 400).json({ message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await userService.loginUser(email, password);
        res.json(userData);
    } catch (error) {
        res.status(error.statusCode || 400).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user ID is set in req.user by authentication middleware
        const userProfile = await userService.getUserProfile(userId);
        res.json(userProfile);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
};