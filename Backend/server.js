const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test MySQL connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database successfully');
  })
  .catch((error) => {
    console.error('MySQL connection error:', error);
  });

// Sync models
sequelize.sync()
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((error) => {
    console.error('Model synchronization error:', error);
  });

// Import routes
const flowerRoutes = require('./routes/flowers');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

// Use routes
app.use('/flowers', flowerRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Flower Shop API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
