const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Generate JWT token
 * @param {String} id - User ID
 * @returns {String} JWT token
 */
// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '20d',
    });
};
const registerUser = async (userData) => {
    const { username, email, password } = userData;
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        const error = new Error('User already exists');
        error.statusCode = 400;
        throw error;
    }
    const user = await User.create({
        username,
        email,
        password,
    });
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
    };
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        };
    } else {
        const error = new Error('Invalid email or password');
        error.status = 401;
        throw error;
    }
};

const getUserProfile = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        bio: user.bio,
    };
};

module.exports = {
    generateToken,
    registerUser,
    loginUser,
    getUserProfile
};