const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const asyncHandler = require('../middleware/async');

const router = express.Router();

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get('/', auth, authorize('admin'), asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get all users - Admin only'
  });
}));

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', auth, asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: `Get user ${req.params.id}`
  });
}));

module.exports = router;