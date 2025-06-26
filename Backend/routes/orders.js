const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Flower = require('../models/Flower');
const { authenticateAdmin } = require('../middleware/auth');

// POST /orders - Create new order (public)
router.post('/', async (req, res) => {
  try {
    const { flowerId, quantity, userName, userAddress } = req.body;
    
    // Find the flower
    const flower = await Flower.findById(flowerId);
    if (!flower) {
      return res.status(404).json({ message: 'Flower not found' });
    }
    
    // Check stock availability
    if (flower.stock < quantity) {
      return res.status(400).json({ 
        message: 'Not enough stock available',
        availableStock: flower.stock 
      });
    }
    
    // Calculate total price
    const totalPrice = flower.price * quantity;
    
    // Create order
    const order = new Order({
      flowerId,
      quantity,
      userName,
      userAddress,
      totalPrice
    });
    
    // Save order and update flower stock
    const savedOrder = await order.save();
    
    // Reduce flower stock
    flower.stock -= quantity;
    await flower.save();
    
    // Populate flower details in response
    const populatedOrder = await Order.findById(savedOrder._id).populate('flowerId');
    
    res.status(201).json({
      message: 'Order placed successfully',
      order: populatedOrder
    });
    
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
});

// GET /orders - Get all orders (admin only)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('flowerId')
      .sort({ orderDate: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

module.exports = router;
