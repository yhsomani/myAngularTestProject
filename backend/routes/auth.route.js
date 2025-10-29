// routes/auth.route.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modules/User');

const JWT_SECRET = '4dd815a63667e1f6a25b65b47cebdcbe';
const JWT_EXPIRES_IN = '24h'; // Increased token expiry to 24 hours

// Input validation
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

// -------------------------------------------------
// POST /api/auth/register
// -------------------------------------------------
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Enhanced validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email and password are required',
        details: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Invalid email format'
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user exists
    let existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'User already exists'
      });
    }

    // Create new user
    const user = new User({
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 12) // Increased from 10 to 12 rounds
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { user: { id: user.id } },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Registration failed'
    });
  }
});

// -------------------------------------------------
// POST /api/auth/login
// -------------------------------------------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        error: 'Authentication Error',
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Authentication Error',
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = jwt.sign(
      { user: { id: user.id } },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Login failed'
    });
  }
});

// -------------------------------------------------
// GET /api/auth/verify
// -------------------------------------------------
router.get('/verify', async (req, res) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Authentication Error',
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.user.id).select('-password');

    if (!user) {
      return res.status(401).json({
        error: 'Authentication Error',
        message: 'User not found'
      });
    }

    res.json({
      message: 'Token is valid',
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (err) {
    res.status(401).json({
      error: 'Authentication Error',
      message: 'Invalid token'
    });
  }
});

module.exports = router;
