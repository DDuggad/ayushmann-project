const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const asyncHandler = require('../middleware/async');

const router = express.Router();

// @desc    Create demo users
// @route   POST /api/auth/seed-demo
// @access  Public (for development only)
router.post('/seed-demo', asyncHandler(async (req, res) => {
  try {
    // Check if demo users already exist
    const existingPatient = await User.findOne({ email: 'patient@demo.com' });
    const existingPractitioner = await User.findOne({ email: 'doctor@demo.com' });

    if (!existingPatient) {
      const demoPatient = new User({
        name: 'Demo Patient',
        email: 'patient@demo.com',
        phone: '+1234567890',
        password: 'demo123',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'male',
        role: 'patient',
        medicalHistory: ['Previous Panchakarma treatment in 2023'],
        allergies: ['None'],
        currentMedications: ['Ashwagandha supplements']
      });
      await demoPatient.save();
    }

    if (!existingPractitioner) {
      const demoPractitioner = new User({
        name: 'Dr. Demo Practitioner',
        email: 'doctor@demo.com',
        phone: '+1234567891',
        password: 'demo123',
        dateOfBirth: new Date('1980-01-01'),
        gender: 'female',
        role: 'practitioner',
        specialization: 'Panchakarma Therapy',
        experience: 15,
        license: 'AYUR-12345'
      });
      await demoPractitioner.save();
    }

    res.json({
      success: true,
      message: 'Demo users created successfully',
      users: {
        patient: 'patient@demo.com / demo123',
        practitioner: 'doctor@demo.com / demo123'
      }
    });
  } catch (error) {
    console.error('Error creating demo users:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating demo users',
      error: error.message
    });
  }
}));

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('phone').isMobilePhone().withMessage('Please enter a valid phone number'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('dateOfBirth').isISO8601().withMessage('Please enter a valid date of birth'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Please select a valid gender'),
  body('role').optional().isIn(['patient', 'practitioner']).withMessage('Invalid role')
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const {
    name,
    email,
    phone,
    password,
    dateOfBirth,
    gender,
    role,
    medicalHistory,
    allergies,
    currentMedications,
    specialization,
    experience,
    license
  } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email'
    });
  }

  // Create user object
  const userData = {
    name,
    email,
    phone,
    password,
    dateOfBirth,
    gender,
    role: role || 'patient'
  };

  // Add role-specific data
  if (userData.role === 'patient') {
    userData.medicalInfo = {
      medicalHistory: medicalHistory ? medicalHistory.split(',').map(item => item.trim()) : [],
      allergies: allergies ? allergies.split(',').map(item => item.trim()) : [],
      currentMedications: currentMedications ? currentMedications.split(',').map(item => item.trim()) : []
    };
  } else if (userData.role === 'practitioner') {
    userData.professionalInfo = {
      specialization: specialization || 'general',
      experience: experience || '0-2',
      license: license || '',
      qualifications: [],
      languages: ['english', 'hindi'],
      availability: {
        monday: { start: '09:00', end: '17:00', available: true },
        tuesday: { start: '09:00', end: '17:00', available: true },
        wednesday: { start: '09:00', end: '17:00', available: true },
        thursday: { start: '09:00', end: '17:00', available: true },
        friday: { start: '09:00', end: '17:00', available: true },
        saturday: { start: '09:00', end: '17:00', available: true },
        sunday: { start: '09:00', end: '17:00', available: false }
      }
    };
  }

  // Create user
  const user = await User.create(userData);

  // Generate JWT token
  const token = user.getSignedJwtToken();

  // Update last login
  user.lastLogin = Date.now();
  await user.save();

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: user.getPublicProfile()
  });
}));

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').exists().withMessage('Password is required')
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Check if account is active
  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Account is deactivated. Please contact support.'
    });
  }

  // Check password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Generate JWT token
  const token = user.getSignedJwtToken();

  // Update last login
  user.lastLogin = Date.now();
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: user.getPublicProfile()
  });
}));

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', auth, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    user: user.getPublicProfile()
  });
}));

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', auth, [
  body('name').optional().trim().isLength({ min: 2, max: 100 }),
  body('phone').optional().isMobilePhone(),
  body('bio').optional().isLength({ max: 500 })
], asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Update allowed fields
  const allowedFields = ['name', 'phone', 'bio', 'address', 'preferences'];
  const updates = {};

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  // Role-specific updates
  if (user.role === 'patient' && req.body.medicalInfo) {
    updates.medicalInfo = { ...user.medicalInfo, ...req.body.medicalInfo };
  }

  if (user.role === 'practitioner' && req.body.professionalInfo) {
    updates.professionalInfo = { ...user.professionalInfo, ...req.body.professionalInfo };
  }

  // Update user
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    updates,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user: updatedUser.getPublicProfile()
  });
}));

// @desc    Change password
// @route   PUT /api/auth/password
// @access  Private
router.put('/password', auth, [
  body('currentPassword').exists().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  const isMatch = await user.matchPassword(req.body.currentPassword);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Current password is incorrect'
    });
  }

  // Update password
  user.password = req.body.newPassword;
  await user.save();

  // Generate new JWT token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
    token
  });
}));

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email')
], asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Generate reset token
  const resetToken = user.getResetPasswordToken();
  await user.save();

  // TODO: Send email with reset token
  // For now, we'll just return it (in production, this should be sent via email)

  res.status(200).json({
    success: true,
    message: 'Password reset token generated',
    resetToken // Remove this in production
  });
}));

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
router.put('/reset-password/:token', [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], asyncHandler(async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired reset token'
    });
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // Generate JWT token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    message: 'Password reset successful',
    token
  });
}));

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
router.post('/logout', auth, asyncHandler(async (req, res) => {
  // In a real application, you might want to blacklist the token
  // For now, we'll just send a success response
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
}));

module.exports = router;