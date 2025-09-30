const express = require('express');
const { auth } = require('../middleware/auth');
const asyncHandler = require('../middleware/async');

const router = express.Router();

// @desc    Get treatments
// @route   GET /api/treatments
// @access  Private
router.get('/', auth, asyncHandler(async (req, res) => {
  const treatments = [
    {
      id: 1,
      name: 'Abhyanga',
      description: 'Full body massage with warm herbal oils',
      duration: 60,
      price: 2500,
      category: 'massage'
    },
    {
      id: 2,
      name: 'Shirodhara',
      description: 'Continuous pouring of liquid over the forehead',
      duration: 90,
      price: 3500,
      category: 'therapy'
    },
    {
      id: 3,
      name: 'Panchakarma Consultation',
      description: 'Initial assessment and treatment planning',
      duration: 45,
      price: 1500,
      category: 'consultation'
    }
  ];

  res.status(200).json({
    success: true,
    data: treatments
  });
}));

module.exports = router;