import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useNotifications } from '../../../contexts/NotificationContext';
import AyurvedaMap from '../../../components/Map/AyurvedaMap';
import {
  LoadingSpinner,
  Card,
  StatCard,
  Button,
  Container,
  Grid,
  Section,
  containerVariants,
  itemVariants
} from '../../../components/UI';
import './PatientDashboard.css';

const PatientDashboard = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [dashboardData, setDashboardData] = useState({
    upcomingAppointments: [],
    treatmentProgress: {},
    recentActivities: [],
    healthMetrics: {},
    quickStats: {}
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for demonstration
  useEffect(() => {
    const fetchDashboardData = () => {
      setTimeout(() => {
        setDashboardData({
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
        });
        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="patient-dashboard"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container">
        {/* Header */}
        <motion.div className="dashboard-header" variants={itemVariants}>
          <div className="welcome-section">
            <h1>Welcome back, {user?.name}! 🌿</h1>
            <p>Continue your wellness journey with personalized Ayurvedic care</p>
          </div>
          <div className="header-actions">
            <Link to="/booking" className="btn btn-primary">
              Book Appointment
            </Link>
            <button
              className="btn btn-secondary"
              onClick={() => addNotification({
                type: 'info',
                title: 'Health Reminder',
                message: 'Time for your evening meditation'
              })}
            >
              Quick Actions
            </button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div className="dashboard-tabs" variants={itemVariants}>
          <button
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            🗺️ Find Clinics
          </button>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <>
            {/* Quick Stats */}
            <motion.div className="quick-stats-grid" variants={containerVariants}>
              <motion.div className="stat-card card" variants={itemVariants}>
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <h3>{dashboardData.quickStats.totalSessions}</h3>
                  <p>Total Sessions</p>
                </div>
              </motion.div>
              <motion.div className="stat-card card" variants={itemVariants}>
                <div className="stat-icon">⏱️</div>
                <div className="stat-content">
                  <h3>{dashboardData.quickStats.daysInTreatment}</h3>
                  <p>Days in Treatment</p>
                </div>
              </motion.div>
              <motion.div className="stat-card card" variants={itemVariants}>
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <h3>{dashboardData.quickStats.completionRate}%</h3>
                  <p>Completion Rate</p>
                </div>
              </motion.div>
              <motion.div className="stat-card card" variants={itemVariants}>
                <div className="stat-icon">🔔</div>
                <div className="stat-content">
                  <h3>{dashboardData.quickStats.upcomingAppointments}</h3>
                  <p>Upcoming</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}

        {activeTab === 'map' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AyurvedaMap />
          </motion.div>
        )}

        {activeTab === 'dashboard' && (
          <>
            <div className="dashboard-grid">
              {/* Upcoming Appointments */}
              <motion.div className="dashboard-card card" variants={itemVariants}>
                <div className="card-header">
                  <h2>Upcoming Appointments</h2>
                  <Link to="/patient/schedule" className="card-action">
                    View All
                  </Link>
                </div>
                <div className="card-body">
                  {dashboardData.upcomingAppointments.length > 0 ? (
                    <div className="appointments-list">
                      {dashboardData.upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="appointment-item">
                          <div className="appointment-date">
                            <span className="date">{new Date(appointment.date).getDate()}</span>
                            <span className="month">
                              {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}
                            </span>
                          </div>
                          <div className="appointment-details">
                            <h4>{appointment.treatment}</h4>
                            <p>{appointment.therapist}</p>
                            <div className="appointment-meta">
                              <span className="time">🕐 {appointment.time}</span>
                              <span className="location">📍 {appointment.location}</span>
                            </div>
                          </div>
                          <div className={`appointment-status status-${appointment.status}`}>
                            {appointment.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>No upcoming appointments</p>
                      <Link to="/booking" className="btn btn-primary btn-sm">
                        Schedule Now
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Treatment Progress */}
              <motion.div className="dashboard-card card" variants={itemVariants}>
                <div className="card-header">
                  <h2>Treatment Progress</h2>
                </div>
                <div className="card-body">
                  <div className="progress-summary">
                    <h3>{dashboardData.treatmentProgress.currentPackage}</h3>
                    <div className="progress-stats">
                      <div className="progress-item">
                        <span>Sessions:</span>
                        <span>{dashboardData.treatmentProgress.completedSessions}/{dashboardData.treatmentProgress.totalSessions}</span>
                      </div>
                      <div className="progress-item">
                        <span>Started:</span>
                        <span>{new Date(dashboardData.treatmentProgress.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="progress-item">
                        <span>Est. Completion:</span>
                        <span>{new Date(dashboardData.treatmentProgress.estimatedCompletion).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar">
                      <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${dashboardData.treatmentProgress.progressPercentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <span className="progress-percentage">{dashboardData.treatmentProgress.progressPercentage}%</span>
                  </div>
                </div>
              </motion.div>

              {/* Health Metrics */}
              <motion.div className="dashboard-card card" variants={itemVariants}>
                <div className="card-header">
                  <h2>Daily Health Metrics</h2>
                  <button className="card-action btn-ghost">Update</button>
                </div>
                <div className="card-body">
                  <div className="metrics-grid">
                    {Object.entries(dashboardData.healthMetrics).map(([metric, value]) => (
                      <div key={metric} className="metric-item">
                        <div className="metric-label">{metric.charAt(0).toUpperCase() + metric.slice(1)}</div>
                        <div className="metric-value">
                          <div className="metric-bar">
                            <motion.div
                              className="metric-fill"
                              initial={{ width: 0 }}
                              animate={{ width: `${(value / 10) * 100}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                            />
                          </div>
                          <span className="metric-score">{value}/10</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="metrics-summary">
                    <p>Overall wellness score: <strong>7.8/10</strong> 📈</p>
                  </div>
                </div>
              </motion.div>

              {/* Recent Activities */}
              <motion.div className="dashboard-card card" variants={itemVariants}>
                <div className="card-header">
                  <h2>Recent Activities</h2>
                </div>
                <div className="card-body">
                  <div className="activities-list">
                    {dashboardData.recentActivities.map((activity) => (
                      <div key={activity.id} className="activity-item">
                        <div className="activity-icon">{activity.icon}</div>
                        <div className="activity-content">
                          <p>{activity.message}</p>
                          <span className="activity-time">{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div className="dashboard-card card quick-actions-card" variants={itemVariants}>
                <div className="card-header">
                  <h2>Quick Actions</h2>
                </div>
                <div className="card-body">
                  <div className="quick-actions-grid">
                    <Link to="/booking" className="quick-action-item">
                      <div className="action-icon">📅</div>
                      <span>Book Appointment</span>
                    </Link>
                    <Link to="/patient/profile" className="quick-action-item">
                      <div className="action-icon">👤</div>
                      <span>Update Profile</span>
                    </Link>
                    <button className="quick-action-item">
                      <div className="action-icon">💬</div>
                      <span>Chat with AI</span>
                    </button>
                    <button className="quick-action-item">
                      <div className="action-icon">📋</div>
                      <span>View Reports</span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Wellness Tips */}
              <motion.div className="dashboard-card card wellness-tips-card" variants={itemVariants}>
                <div className="card-header">
                  <h2>Today's Wellness Tip</h2>
                </div>
                <div className="card-body">
                  <div className="wellness-tip">
                    <div className="tip-icon">💡</div>
                    <div className="tip-content">
                      <h4>Morning Routine</h4>
                      <p>Start your day with warm water and lemon to aid digestion and detoxification. This simple practice aligns with Ayurvedic principles for optimal health.</p>
                    </div>
                  </div>
                  <div className="tip-actions">
                    <button className="btn btn-ghost btn-sm">Mark as Done</button>
                    <button className="btn btn-ghost btn-sm">Learn More</button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PatientDashboard;