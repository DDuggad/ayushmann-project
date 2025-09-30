import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LandingPage.css';

const LandingPage = () => {
  const features = [
    {
      icon: '🧘‍♀️',
      title: 'Smart Scheduling',
      description: 'AI-powered therapy scheduling that matches patients with the right practitioners and treatments.',
      color: 'from-primary-400 to-primary-600'
    },
    {
      icon: '📊',
      title: 'Real-time Tracking',
      description: 'Monitor your Panchakarma journey with live updates and progress insights.',
      color: 'from-accent-400 to-accent-600'
    },
    {
      icon: '🔔',
      title: 'Multi-channel Notifications',
      description: 'Stay informed with SMS, email, and in-app notifications in your preferred language.',
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      icon: '🔒',
      title: 'HIPAA Compliant',
      description: 'Your health data is protected with enterprise-grade security and encryption.',
      color: 'from-blue-400 to-blue-600'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Ayurvedic Practitioner',
      content: 'AyushMann has revolutionized how I manage my practice. The scheduling system is intuitive and the patient insights are invaluable.',
      avatar: '👩‍⚕️'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Patient',
      content: 'The app made my Panchakarma treatment so much easier to follow. I love getting updates about my progress in Hindi!',
      avatar: '🙋‍♂️'
    },
    {
      name: 'Wellness Center Chennai',
      role: 'Healthcare Facility',
      content: 'Our patient satisfaction increased by 40% after implementing AyushMann. The automation saves us hours daily.',
      avatar: '🏥'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
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

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <motion.section
        className="hero"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="hero-background">
          <div className="hero-pattern animate-float"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <motion.h1
              className="hero-title gradient-text"
              variants={heroVariants}
            >
              Modern Ayurvedic Care
              <span className="title-highlight"> Management</span>
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              variants={fadeInUpVariants}
            >
              Streamline your Panchakarma treatments with AI-powered scheduling,
              real-time progress tracking, and seamless communication between
              patients and practitioners.
            </motion.p>
            <motion.div
              className="hero-actions"
              variants={itemVariants}
            >
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary btn-lg">
                Sign In
              </Link>
            </motion.div>
            <motion.div
              className="hero-stats"
              variants={itemVariants}
            >
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Happy Patients</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Practitioners</span>
              </div>
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Treatment Centers</span>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="hero-image"
            variants={itemVariants}
          >
            <div className="hero-illustration">
              <div className="illustration-card card-1">
                <div className="card-icon">📅</div>
                <div className="card-text">Smart Scheduling</div>
              </div>
              <div className="illustration-card card-2">
                <div className="card-icon">🌿</div>
                <div className="card-text">Ayurvedic Treatments</div>
              </div>
              <div className="illustration-card card-3">
                <div className="card-icon">📊</div>
                <div className="card-text">Progress Tracking</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="section-header" variants={itemVariants}>
            <h2>Comprehensive Healthcare Management</h2>
            <p>Everything you need to manage Panchakarma treatments effectively</p>
          </motion.div>
          <motion.div
            className="features-grid"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card card hover-lift"
                variants={featureVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
              >
                <div className={`feature-icon bg-gradient-to-r ${feature.color} animate-pulse`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="how-it-works"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="section-header" variants={itemVariants}>
            <h2>How AyushMann Works</h2>
            <p>Simple steps to transform your healthcare experience</p>
          </motion.div>
          <motion.div
            className="steps-container"
            variants={containerVariants}
          >
            <div className="steps-grid">
              <motion.div className="step" variants={itemVariants}>
                <div className="step-number">1</div>
                <h3>Register & Profile</h3>
                <p>Create your account and complete your health profile with our secure system.</p>
              </motion.div>
              <motion.div className="step" variants={itemVariants}>
                <div className="step-number">2</div>
                <h3>AI Consultation</h3>
                <p>Our AI system analyzes your needs and matches you with the right treatments and practitioners.</p>
              </motion.div>
              <motion.div className="step" variants={itemVariants}>
                <div className="step-number">3</div>
                <h3>Smart Scheduling</h3>
                <p>Book appointments seamlessly with automatic reminders and flexible rescheduling options.</p>
              </motion.div>
              <motion.div className="step" variants={itemVariants}>
                <div className="step-number">4</div>
                <h3>Track Progress</h3>
                <p>Monitor your healing journey with real-time updates and personalized insights.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="testimonials"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="section-header" variants={itemVariants}>
            <h2>What Our Community Says</h2>
            <p>Trusted by healthcare professionals and patients across India</p>
          </motion.div>
          <motion.div
            className="testimonials-grid"
            variants={containerVariants}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card card"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="testimonial-content">
                  <p>"{testimonial.content}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="cta-content" variants={itemVariants}>
            <h2>Ready to Transform Your Healthcare Experience?</h2>
            <p>Join thousands of patients and practitioners who trust AyushMann for their Ayurvedic care management.</p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-accent btn-lg">
                Start Free Trial
              </Link>
              <Link to="/login" className="btn btn-ghost btn-lg">
                Sign In to Your Account
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="footer-content" variants={itemVariants}>
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">🌿</span>
                <span className="logo-text">AyushMann</span>
              </div>
              <p>Modernizing Ayurvedic care with technology and tradition.</p>
            </div>
            <div className="footer-links">
              <div className="footer-section">
                <h4>Product</h4>
                <ul>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#security">Security</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Support</h4>
                <ul>
                  <li><a href="#help">Help Center</a></li>
                  <li><a href="#contact">Contact Us</a></li>
                  <li><a href="#docs">Documentation</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Company</h4>
                <ul>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#blog">Blog</a></li>
                </ul>
              </div>
            </div>
          </motion.div>
          <motion.div className="footer-bottom" variants={itemVariants}>
            <p>&copy; 2025 AyushMann. Built for Smart India Hackathon. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;