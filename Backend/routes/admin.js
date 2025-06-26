const express = require('express');
const router = express.Router();
const { ADMIN_TOKEN } = require('../middleware/auth');

// Admin login
router.post('/login', (req, res) => {
  const { password } = req.body;
  
  // Simple password check (in real app, use proper hashing)
  if (password === 'admin123') {
    res.json({ 
      message: 'Login successful',
      token: ADMIN_TOKEN 
    });
  } else {
    res.status(401).json({ message: 'Invalid password' });
  }
});

module.exports = router;
