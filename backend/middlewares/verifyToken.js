// Verification Middleware
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(403).json({ message: 'No token found' });
        
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default verifyToken;