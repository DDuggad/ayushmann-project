const express = require('express');
const { auth } = require('../middleware/auth');
const asyncHandler = require('../middleware/async');

const router = express.Router();

// @desc    Get user appointments
// @route   GET /api/appointments
// @access  Private
router.get('/', auth, asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get user appointments',
    data: []
  });
}));

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
router.post('/', auth, asyncHandler(async (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Appointment created successfully'
  });
}));

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
router.put('/:id', auth, asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: `Appointment ${req.params.id} updated`
  });
}));

// @desc    Cancel appointment
// @route   DELETE /api/appointments/:id
// @access  Private
router.delete('/:id', auth, asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: `Appointment ${req.params.id} cancelled`
  });
}));

module.exports = router;