// server/middlewares/admin.middleware.js
const isAdmin = (req, res, next) => {
    // We assume the 'protect' middleware has already run and attached the user
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed to the next function (the controller)
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' }); // 403 Forbidden
    }
};

export { isAdmin };