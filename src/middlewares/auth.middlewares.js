const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

/**
 * Authentication middleware to protect routes
 * Verifies JWT token and attaches user to request
 */
async function authUser(req, res, next) {
    try {
        // Get token from cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "Authentication required. Please login." 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user and exclude password
        const user = await userModel.findById(decoded.id)
            .select('-password');

        if (!user) {
            return res.status(401).json({
                success: false, 
                message: "User not found"
            });
        }

        // Attach user to request object
        req.user = user;
        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please login again."
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = authUser;