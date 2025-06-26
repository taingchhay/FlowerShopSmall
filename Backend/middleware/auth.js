// Simple admin authentication middleware
const ADMIN_TOKEN = 'admin-token-123';

const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Remove 'Bearer ' prefix if present
  const cleanToken = token.replace('Bearer ', '');
  
  if (cleanToken !== ADMIN_TOKEN) {
    return res.status(401).json({ message: 'Access denied. Invalid token.' });
  }

  next();
};

module.exports = { authenticateAdmin, ADMIN_TOKEN };
