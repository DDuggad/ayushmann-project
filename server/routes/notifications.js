const express = require('express');
const { auth } = require('../middleware/auth');
const asyncHandler = require('../middleware/async');

const router = express.Router();

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
router.get('/', auth, asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get user notifications',
    data: []
  });
}));

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
router.put('/:id/read', auth, asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: `Notification ${req.params.id} marked as read`
  });
}));

module.exports = router;