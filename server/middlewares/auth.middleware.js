// server/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token payload (ID) and attach to request
            // Exclude the password field from the user object
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Move to the next function (the controller)
        } catch (error) {
            console.error(error);
            res.status(401).send('Not authorized, token failed');
        }
    }
    if (!token) {
        res.status(401).send('Not authorized, no token');
    }
};