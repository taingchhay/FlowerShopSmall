const express = require('express');
const router = express.Router();
const Flower = require('../models/Flower');
const { authenticateAdmin } = require('../middleware/auth');

// Public routes

// GET /flowers - Get all flowers
router.get('/', async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.json(flowers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flowers', error: error.message });
  }
});

// GET /flowers/:id - Get single flower
router.get('/:id', async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id);
    if (!flower) {
      return res.status(404).json({ message: 'Flower not found' });
    }
    res.json(flower);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flower', error: error.message });
  }
});

// Admin routes (protected)

// POST /flowers - Add new flower (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock } = req.body;
    
    const flower = new Flower({
      name,
      description,
      price,
      imageUrl,
      stock
    });
    
    const savedFlower = await flower.save();
    res.status(201).json(savedFlower);
  } catch (error) {
    res.status(400).json({ message: 'Error creating flower', error: error.message });
  }
});

// PUT /flowers/:id - Update flower (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock } = req.body;
    
    const flower = await Flower.findByIdAndUpdate(
      req.params.id,
      { name, description, price, imageUrl, stock },
      { new: true, runValidators: true }
    );
    
    if (!flower) {
      return res.status(404).json({ message: 'Flower not found' });
    }
    
    res.json(flower);
  } catch (error) {
    res.status(400).json({ message: 'Error updating flower', error: error.message });
  }
});

// DELETE /flowers/:id - Delete flower (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const flower = await Flower.findByIdAndDelete(req.params.id);
    
    if (!flower) {
      return res.status(404).json({ message: 'Flower not found' });
    }
    
    res.json({ message: 'Flower deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting flower', error: error.message });
  }
});

module.exports = router;
