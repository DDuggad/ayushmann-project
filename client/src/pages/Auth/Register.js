import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import './Auth.css';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',

    // Account Info
    password: '',
    confirmPassword: '',
    role: 'patient',

    // Medical Info (for patients)
    medicalHistory: '',
    allergies: '',
    currentMedications: '',

    // Professional Info (for practitioners)
    specialization: '',
    experience: '',
    license: '',

    // Terms
    agreeTerms: false,
    agreePrivacy: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { register } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }

    if (stepNumber === 2) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (stepNumber === 4) {
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
      if (!formData.agreePrivacy) newErrors.agreePrivacy = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(4)) return;

    setLoading(true);
    try {
      const result = await register(formData);

      if (result.success) {
        addNotification({
          type: 'success',
          title: 'Account created successfully!',
          message: `Welcome to AyushMann, ${result.user.name}`
        });

        // Redirect based on user role
        if (result.user.role === 'patient') {
          navigate('/patient/dashboard');
        } else if (result.user.role === 'practitioner') {
          navigate('/practitioner/dashboard');
        } else {
          navigate('/');
        }
      } else {
        addNotification({
          type: 'error',
          title: 'Registration failed',
          message: result.error
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Registration failed',
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

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-pattern"></div>
      </div>

      <motion.div
        className="auth-container register-container"
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
            <h1>Create Account</h1>
            <p>Join our community for personalized Ayurvedic care</p>
          </div>

          {/* Progress Indicator */}
          <div className="progress-indicator">
            {[1, 2, 3, 4].map((stepNum) => (
              <div
                key={stepNum}
                className={`progress-step ${step >= stepNum ? 'active' : ''} ${step > stepNum ? 'completed' : ''}`}
              >
                <span>{step > stepNum ? '✓' : stepNum}</span>
              </div>
            ))}
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="form-step"
              >
                <h3>Personal Information</h3>

                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                    {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      className={`form-select ${errors.gender ? 'error' : ''}`}
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <span className="error-message">{errors.gender}</span>}
                  </div>
                </div>

                <button type="button" className="btn btn-primary" onClick={handleNext}>
                  Continue
                </button>
              </motion.div>
            )}

            {/* Step 2: Account Setup */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="form-step"
              >
                <h3>Account Setup</h3>

                <div className="form-group">
                  <label htmlFor="role" className="form-label">Account Type</label>
                  <div className="role-selector">
                    <label className={`role-option ${formData.role === 'patient' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="role"
                        value="patient"
                        checked={formData.role === 'patient'}
                        onChange={handleChange}
                      />
                      <div className="role-content">
                        <span className="role-icon">🧘‍♀️</span>
                        <span className="role-title">Patient</span>
                        <span className="role-desc">Receive treatments</span>
                      </div>
                    </label>
                    <label className={`role-option ${formData.role === 'practitioner' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="role"
                        value="practitioner"
                        checked={formData.role === 'practitioner'}
                        onChange={handleChange}
                      />
                      <div className="role-content">
                        <span className="role-icon">👩‍⚕️</span>
                        <span className="role-title">Practitioner</span>
                        <span className="role-desc">Provide treatments</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-ghost" onClick={handlePrev}>
                    Back
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleNext}>
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Additional Information */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="form-step"
              >
                <h3>
                  {formData.role === 'patient' ? 'Medical Information' : 'Professional Information'}
                </h3>

                {formData.role === 'patient' ? (
                  <>
                    <div className="form-group">
                      <label htmlFor="medicalHistory" className="form-label">
                        Medical History (Optional)
                      </label>
                      <textarea
                        id="medicalHistory"
                        name="medicalHistory"
                        className="form-textarea"
                        placeholder="Previous medical conditions, surgeries, etc."
                        value={formData.medicalHistory}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="allergies" className="form-label">
                        Allergies (Optional)
                      </label>
                      <input
                        type="text"
                        id="allergies"
                        name="allergies"
                        className="form-input"
                        placeholder="Food, drug, or environmental allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="currentMedications" className="form-label">
                        Current Medications (Optional)
                      </label>
                      <input
                        type="text"
                        id="currentMedications"
                        name="currentMedications"
                        className="form-input"
                        placeholder="List current medications"
                        value={formData.currentMedications}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="specialization" className="form-label">Specialization</label>
                      <select
                        id="specialization"
                        name="specialization"
                        className="form-select"
                        value={formData.specialization}
                        onChange={handleChange}
                      >
                        <option value="">Select specialization</option>
                        <option value="panchakarma">Panchakarma Specialist</option>
                        <option value="general">General Ayurveda</option>
                        <option value="herbal">Herbal Medicine</option>
                        <option value="nutrition">Ayurvedic Nutrition</option>
                        <option value="massage">Therapeutic Massage</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="experience" className="form-label">Years of Experience</label>
                      <select
                        id="experience"
                        name="experience"
                        className="form-select"
                        value={formData.experience}
                        onChange={handleChange}
                      >
                        <option value="">Select experience</option>
                        <option value="0-2">0-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="license" className="form-label">
                        License Number (Optional)
                      </label>
                      <input
                        type="text"
                        id="license"
                        name="license"
                        className="form-input"
                        placeholder="Professional license number"
                        value={formData.license}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                <div className="form-actions">
                  <button type="button" className="btn btn-ghost" onClick={handlePrev}>
                    Back
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleNext}>
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Terms and Confirmation */}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="form-step"
              >
                <h3>Terms & Conditions</h3>

                <div className="terms-section">
                  <label className={`checkbox-label ${errors.agreeTerms ? 'error' : ''}`}>
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      className="checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                    />
                    <span className="checkbox-text">
                      I agree to the <Link to="/terms">Terms of Service</Link>
                    </span>
                  </label>
                  {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}

                  <label className={`checkbox-label ${errors.agreePrivacy ? 'error' : ''}`}>
                    <input
                      type="checkbox"
                      name="agreePrivacy"
                      className="checkbox"
                      checked={formData.agreePrivacy}
                      onChange={handleChange}
                    />
                    <span className="checkbox-text">
                      I agree to the <Link to="/privacy">Privacy Policy</Link>
                    </span>
                  </label>
                  {errors.agreePrivacy && <span className="error-message">{errors.agreePrivacy}</span>}
                </div>

                <div className="account-summary">
                  <h4>Account Summary</h4>
                  <div className="summary-item">
                    <span>Name:</span>
                    <span>{formData.name}</span>
                  </div>
                  <div className="summary-item">
                    <span>Email:</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className="summary-item">
                    <span>Account Type:</span>
                    <span className="role-badge">{formData.role}</span>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-ghost" onClick={handlePrev}>
                    Back
                  </button>
                  <motion.button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;