const express = require('express');
const { auth } = require('../middleware/auth');
const asyncHandler = require('../middleware/async');

const router = express.Router();

// @desc    Get dashboard data for patients
// @route   GET /api/dashboard/patient
// @access  Private (Patient)
router.get('/patient', auth, asyncHandler(async (req, res) => {
  if (req.user.role !== 'patient') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Patient role required.'
    });
  }

  // Mock dashboard data - replace with real database queries
  const dashboardData = {
    upcomingAppointments: [
      {
        id: 1,
        date: '2025-09-29',
        time: '10:00 AM',
        therapist: 'Dr. Priya Sharma',
        treatment: 'Abhyanga Massage',
        location: 'Wellness Center - Room 3',
        status: 'confirmed'
      },
      {
        id: 2,
        date: '2025-10-02',
        time: '2:00 PM',
        therapist: 'Dr. Rajesh Kumar',
        treatment: 'Shirodhara',
        location: 'Wellness Center - Room 1',
        status: 'pending'
      }
    ],
    treatmentProgress: {
      currentPackage: 'Panchakarma Detox Program',
      completedSessions: 5,
      totalSessions: 14,
      startDate: '2025-09-15',
      estimatedCompletion: '2025-10-15',
      progressPercentage: 36
    },
    recentActivities: [
      {
        id: 1,
        type: 'appointment',
        message: 'Completed Abhyanga session with Dr. Priya',
        time: '2 hours ago',
        icon: '💆‍♀️'
      },
      {
        id: 2,
        type: 'prescription',
        message: 'New herbal prescription added',
        time: '1 day ago',
        icon: '🌿'
      },
      {
        id: 3,
        type: 'report',
        message: 'Weekly progress report generated',
        time: '3 days ago',
        icon: '📊'
      }
    ],
    healthMetrics: {
      mood: 8,
      energy: 7,
      sleep: 9,
      digestion: 8,
      stress: 3
    },
    quickStats: {
      totalSessions: 12,
      daysInTreatment: 14,
      upcomingAppointments: 2,
      completionRate: 86
    }
  };

  res.status(200).json({
    success: true,
    data: dashboardData
  });
}));

// @desc    Get dashboard data for practitioners
// @route   GET /api/dashboard/practitioner
// @access  Private (Practitioner)
router.get('/practitioner', auth, asyncHandler(async (req, res) => {
  if (req.user.role !== 'practitioner') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Practitioner role required.'
    });
  }

  // Mock dashboard data - replace with real database queries
  const dashboardData = {
    todaysSchedule: [
      {
        id: 1,
        time: '9:00 AM',
        patient: 'John Doe',
        treatment: 'Abhyanga',
        duration: '60 min',
        status: 'confirmed'
      },
      {
        id: 2,
        time: '11:00 AM',
        patient: 'Jane Smith',
        treatment: 'Shirodhara',
        duration: '90 min',
        status: 'confirmed'
      },
      {
        id: 3,
        time: '2:00 PM',
        patient: 'Mike Johnson',
        treatment: 'Consultation',
        duration: '30 min',
        status: 'pending'
      }
    ],
    weeklyStats: {
      totalAppointments: 28,
      completedSessions: 25,
      cancelledSessions: 2,
      newPatients: 5,
      revenue: 15000
    },
    patientProgress: [
      {
        patientName: 'John Doe',
        treatmentPlan: 'Panchakarma Detox',
        progress: 75,
        nextSession: '2025-09-30'
      },
      {
        patientName: 'Jane Smith',
        treatmentPlan: 'Stress Relief Package',
        progress: 50,
        nextSession: '2025-10-01'
      }
    ],
    notifications: [
      {
        type: 'appointment',
        message: 'New appointment request from Sarah Wilson',
        time: '30 minutes ago'
      },
      {
        type: 'cancellation',
        message: 'Tom Brown cancelled his 3 PM appointment',
        time: '1 hour ago'
      }
    ]
  };

  res.status(200).json({
    success: true,
    data: dashboardData
  });
}));

module.exports = router;