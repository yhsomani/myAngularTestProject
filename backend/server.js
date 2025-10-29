// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middleware/error.middleware');
const authMiddleware = require('./middleware/auth.middleware');

// Import Routes
const employeeRoute = require('./routes/employee.route');
const quizeRoute = require('./routes/quize.route');
const technologyRoute = require('./routes/technology.route');
const authRoute = require('./routes/auth.route');

const app = express();

// -------------------------------------------------
// Middleware
// -------------------------------------------------
app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization']
}));

// Body parser middleware
app.use(bodyParser.json({
    limit: '50mb',
    verify: (req, res, buf) => {
        req.rawBody = buf
    }
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// -------------------------------------------------
// MongoDB Connection
// -------------------------------------------------
mongoose.set('strictQuery', true);
(async () => {
    try {
        const connection = await mongoose.connect('mongodb://127.0.0.1:27017/EmployeeDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        console.log(`✅ Connected to MongoDB Database: ${connection.connections[0].name}`);
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    }
})();

// Handle MongoDB connection errors after initial connection
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// -------------------------------------------------
// Handle favicon.ico requests
// -------------------------------------------------
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

// -------------------------------------------------
// API Routes
// -------------------------------------------------
app.use('/api/auth', authRoute);

// Protected routes - use auth middleware
app.use('/api/employees', authMiddleware, employeeRoute);
app.use('/api/quize', authMiddleware, quizeRoute);
app.use('/api/technologies', authMiddleware, technologyRoute);

// -------------------------------------------------
// Health Check
// -------------------------------------------------
app.get('/api/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({
        status: 'OK',
        database: dbStatus,
        timestamp: new Date().toISOString()
    });
});

// -------------------------------------------------
// 404 Error Handler
// -------------------------------------------------
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.originalUrl} not found`
    });
});

// -------------------------------------------------
// Start Server
// -------------------------------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 API Documentation: http://localhost:${PORT}/api/health`);
});