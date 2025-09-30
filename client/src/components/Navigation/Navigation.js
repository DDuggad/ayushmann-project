import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { addNotification } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    addNotification({
      type: 'success',
      title: 'Logged out successfully',
      message: 'See you soon!'
    });
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      className="navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <motion.div
            className="logo-icon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🌿
          </motion.div>
          <span className="logo-text">AyushMann</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-nav">
          {isAuthenticated ? (
            <>
              {/* Patient Navigation */}
              {user?.role === 'patient' && (
                <>
                  <NavLink
                    to="/patient/dashboard"
                    isActive={isActive('/patient/dashboard')}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/patient/schedule"
                    isActive={isActive('/patient/schedule')}
                  >
                    My Schedule
                  </NavLink>
                  <NavLink
                    to="/booking"
                    isActive={isActive('/booking')}
                  >
                    Book Therapy
                  </NavLink>
                </>
              )}

              {/* Practitioner Navigation */}
              {user?.role === 'practitioner' && (
                <>
                  <NavLink
                    to="/practitioner/dashboard"
                    isActive={isActive('/practitioner/dashboard')}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/practitioner/schedule"
                    isActive={isActive('/practitioner/schedule')}
                  >
                    Schedule
                  </NavLink>
                  <NavLink
                    to="/practitioner/patients"
                    isActive={isActive('/practitioner/patients')}
                  >
                    Patients
                  </NavLink>
                </>
              )}

              {/* Shared Navigation */}
              <NavLink
                to="/notifications"
                isActive={isActive('/notifications')}
              >
                Notifications
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                isActive={isActive('/login')}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                isActive={isActive('/register')}
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* User Menu */}
        {isAuthenticated && (
          <div className="user-menu desktop-nav">
            <div className="user-avatar">
              <span>{user?.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle mobile-nav"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          <motion.div
            animate={isMenuOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 45 },
              closed: { rotate: 0 }
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </motion.div>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-content">
              {isAuthenticated ? (
                <>
                  {/* User Info */}
                  <div className="mobile-user-info">
                    <div className="user-avatar">
                      <span>{user?.name?.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="user-details">
                      <span className="user-name">{user?.name}</span>
                      <span className="user-role">{user?.role}</span>
                    </div>
                  </div>

                  {/* Patient Navigation */}
                  {user?.role === 'patient' && (
                    <>
                      <MobileNavLink
                        to="/patient/dashboard"
                        onClick={closeMenu}
                      >
                        Dashboard
                      </MobileNavLink>
                      <MobileNavLink
                        to="/patient/schedule"
                        onClick={closeMenu}
                      >
                        My Schedule
                      </MobileNavLink>
                      <MobileNavLink
                        to="/booking"
                        onClick={closeMenu}
                      >
                        Book Therapy
                      </MobileNavLink>
                    </>
                  )}

                  {/* Practitioner Navigation */}
                  {user?.role === 'practitioner' && (
                    <>
                      <MobileNavLink
                        to="/practitioner/dashboard"
                        onClick={closeMenu}
                      >
                        Dashboard
                      </MobileNavLink>
                      <MobileNavLink
                        to="/practitioner/schedule"
                        onClick={closeMenu}
                      >
                        Schedule
                      </MobileNavLink>
                      <MobileNavLink
                        to="/practitioner/patients"
                        onClick={closeMenu}
                      >
                        Patients
                      </MobileNavLink>
                    </>
                  )}

                  {/* Shared Navigation */}
                  <MobileNavLink
                    to="/notifications"
                    onClick={closeMenu}
                  >
                    Notifications
                  </MobileNavLink>

                  <button
                    className="btn btn-accent mobile-logout-btn"
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <MobileNavLink
                    to="/login"
                    onClick={closeMenu}
                  >
                    Login
                  </MobileNavLink>
                  <MobileNavLink
                    to="/register"
                    onClick={closeMenu}
                  >
                    Register
                  </MobileNavLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ to, children, isActive }) => (
  <Link
    to={to}
    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
  >
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.span>
  </Link>
);

// Mobile Navigation Link Component
const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    className="mobile-nav-link"
    onClick={onClick}
  >
    <motion.span
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.span>
  </Link>
);

export default Navigation;