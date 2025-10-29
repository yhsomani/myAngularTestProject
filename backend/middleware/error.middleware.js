// middleware/error.middleware.js
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // MongoDB Validation Error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(error => error.message);
        return res.status(400).json({
            error: 'Validation Error',
            message: 'Invalid input data',
            details: errors
        });
    }

    // MongoDB Duplicate Key Error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({
            error: 'Conflict',
            message: `${field} already exists`
        });
    }

    // JWT Authentication Error
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Authentication Error',
            message: 'Invalid token'
        });
    }

    // JWT Expired Error
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'Authentication Error',
            message: 'Token expired'
        });
    }

    // Default Error
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
};

module.exports = errorHandler;