import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Unified Components
import { pageVariants } from './components/UI';
import './components/UI/styles.css';

// Core Components
import Navigation from './components/Navigation/Navigation';
import HomePage from './components/HomePage/HomePage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './components/ErrorBoundary/ErrorBoundary.css';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

// Pages
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PatientDashboard from './pages/Patient/Dashboard/PatientDashboard';
import PractitionerDashboard from './pages/Practitioner/Dashboard/PractitionerDashboard';
import PatientSchedule from './pages/Patient/Schedule/PatientSchedule';
import PatientProfile from './pages/Patient/Profile/PatientProfile';
import PractitionerSchedule from './pages/Practitioner/Schedule/PractitionerSchedule';
import PractitionerPatients from './pages/Practitioner/Patients/PractitionerPatients';
import BookingSystem from './pages/Booking/BookingSystem';
import NotificationCenter from './pages/Notifications/NotificationCenter';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <div className="App">
              <Navigation />
              <motion.main
                className="main-content"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
              >
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/home" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Patient Routes */}
                  <Route path="/patient/dashboard" element={
                    <PrivateRoute role="patient">
                      <PatientDashboard />
                    </PrivateRoute>
                  } />
                  <Route path="/patient/schedule" element={
                    <PrivateRoute role="patient">
                      <PatientSchedule />
                    </PrivateRoute>
                  } />
                  <Route path="/patient/profile" element={
                    <PrivateRoute role="patient">
                      <PatientProfile />
                    </PrivateRoute>
                  } />

                  {/* Practitioner Routes */}
                  <Route path="/practitioner/dashboard" element={
                    <PrivateRoute role="practitioner">
                      <PractitionerDashboard />
                    </PrivateRoute>
                  } />
                  <Route path="/practitioner/schedule" element={
                    <PrivateRoute role="practitioner">
                      <PractitionerSchedule />
                    </PrivateRoute>
                  } />
                  <Route path="/practitioner/patients" element={
                    <PrivateRoute role="practitioner">
                      <PractitionerPatients />
                    </PrivateRoute>
                  } />

                  {/* Shared Routes */}
                  <Route path="/booking" element={
                    <PrivateRoute>
                      <BookingSystem />
                    </PrivateRoute>
                  } />
                  <Route path="/notifications" element={
                    <PrivateRoute>
                      <NotificationCenter />
                    </PrivateRoute>
                  } />
                </Routes>
              </motion.main>
            </div>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;