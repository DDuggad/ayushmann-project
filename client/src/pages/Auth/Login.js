import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // Demo login function
  const handleDemoLogin = async (userType) => {
    setLoading(true);
    const demoCredentials = {
      patient: {
        email: 'patient@demo.com',
        password: 'demo123'
      },
      practitioner: {
        email: 'doctor@demo.com',
        password: 'demo123'
      }
    };

    setFormData(demoCredentials[userType]);

    try {
      const result = await login(demoCredentials[userType].email, demoCredentials[userType].password);
      if (result.success) {
        addNotification(`Welcome! Logged in as demo ${userType}`, 'success');

        // Redirect based on user role
        if (result.user.role === 'patient') {
          navigate('/patient/dashboard', { replace: true });
        } else if (result.user.role === 'practitioner') {
          navigate('/practitioner/dashboard', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        addNotification(result.error || 'Demo login failed', 'error');
      }
    } catch (error) {
      console.error('Demo login failed:', error);
      addNotification('Demo login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        addNotification({
          type: 'success',
          title: 'Welcome back!',
          message: `Good to see you again, ${result.user.name}`
        });

        // Redirect based on user role
        if (result.user.role === 'patient') {
          navigate('/patient/dashboard');
        } else if (result.user.role === 'practitioner') {
          navigate('/practitioner/dashboard');
        } else {
          navigate(from);
        }
      } else {
        addNotification({
          type: 'error',
          title: 'Login failed',
          message: result.error
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Login failed',
        message: 'An unexpected error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-pattern"></div>
      </div>

      <motion.div
        className="auth-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="auth-card card">
          <div className="auth-header">
            <div className="auth-logo">
              <span className="logo-icon">🌿</span>
              <span className="logo-text">AyushMann</span>
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue your wellness journey</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.email && (
                <motion.span
                  className="error-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.email}
                </motion.span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.password && (
                <motion.span
                  className="error-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errors.password}
                </motion.span>
              )}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox" />
                <span className="checkbox-text">Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="demo-accounts">
            <h3>Demo Accounts</h3>
            <div className="demo-grid">
              <motion.button
                type="button"
                className="btn btn-secondary demo-btn"
                onClick={() => handleDemoLogin('patient')}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="demo-icon">🧘‍♀️</span>
                Patient Demo
                <small>Experience patient portal</small>
              </motion.button>
              <motion.button
                type="button"
                className="btn btn-secondary demo-btn"
                onClick={() => handleDemoLogin('practitioner')}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="demo-icon">👩‍⚕️</span>
                Practitioner Demo
                <small>Access doctor dashboard</small>
              </motion.button>
            </div>
          </div>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-benefits">
          <h3>Why Choose AyushMann?</h3>
          <div className="benefits-list">
            <div className="benefit-item">
              <span className="benefit-icon">🔒</span>
              <div className="benefit-content">
                <h4>Secure & Private</h4>
                <p>Your health data is encrypted and HIPAA compliant</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📱</span>
              <div className="benefit-content">
                <h4>Mobile Optimized</h4>
                <p>Access your treatments anywhere, anytime</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🤖</span>
              <div className="benefit-content">
                <h4>AI-Powered</h4>
                <p>Smart scheduling and personalized recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;