// 🌿 AyushMann - Unified UI Components
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// ============================================================================
// LOADING COMPONENTS
// ============================================================================

export const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => (
    <div className="loading-container">
        <motion.div
            className={`loading-spinner ${size}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
            <div className="spinner-inner">
                <div className="spinner-dot"></div>
                <div className="spinner-dot"></div>
                <div className="spinner-dot"></div>
            </div>
        </motion.div>
        {message && (
            <motion.p
                className="loading-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {message}
            </motion.p>
        )}
    </div>
);

export const PageLoader = ({ message = 'Loading AyushMann...' }) => (
    <motion.div
        className="page-loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <div className="loader-content">
            <motion.div
                className="leaf-icon"
                animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                🌿
            </motion.div>
            <h2>AyushMann</h2>
            <LoadingSpinner message={message} />
        </div>
    </motion.div>
);

// ============================================================================
// BUTTON COMPONENTS
// ============================================================================

export const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    loading = false,
    icon,
    className = '',
    ...props
}) => (
    <motion.button
        className={`btn btn-${variant} btn-${size} ${className}`}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        disabled={loading}
        {...props}
    >
        {loading ? (
            <>
                <span className="spinner"></span>
                Loading...
            </>
        ) : (
            <>
                {icon && <span className="btn-icon">{icon}</span>}
                {children}
            </>
        )}
    </motion.button>
);

export const LinkButton = ({ to, children, variant = 'primary', ...props }) => (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link to={to} className={`btn btn-${variant}`} {...props}>
            {children}
        </Link>
    </motion.div>
);

// ============================================================================
// CARD COMPONENTS
// ============================================================================

export const Card = ({
    children,
    className = '',
    hoverable = true,
    ...props
}) => (
    <motion.div
        className={`card ${hoverable ? 'hover-lift' : ''} ${className}`}
        whileHover={hoverable ? { y: -5 } : {}}
        transition={{ duration: 0.2 }}
        {...props}
    >
        {children}
    </motion.div>
);

export const StatCard = ({ icon, title, value, trend, color = 'primary' }) => (
    <Card className={`stat-card stat-${color}`}>
        <div className="stat-icon">{icon}</div>
        <div className="stat-content">
            <div className="stat-value">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {value}
                </motion.span>
            </div>
            <div className="stat-title">{title}</div>
            {trend && (
                <div className={`stat-trend ${trend > 0 ? 'positive' : 'negative'}`}>
                    {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
                </div>
            )}
        </div>
    </Card>
);

// ============================================================================
// FORM COMPONENTS
// ============================================================================

export const FormField = ({
    label,
    error,
    children,
    required = false,
    className = ''
}) => (
    <motion.div
        className={`form-field ${error ? 'error' : ''} ${className}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        {label && (
            <label className="form-label">
                {label}
                {required && <span className="required">*</span>}
            </label>
        )}
        {children}
        {error && (
            <motion.span
                className="error-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {error}
            </motion.span>
        )}
    </motion.div>
);

export const Input = ({ className = '', ...props }) => (
    <input className={`form-input ${className}`} {...props} />
);

export const TextArea = ({ className = '', ...props }) => (
    <textarea className={`form-textarea ${className}`} {...props} />
);

export const Select = ({ options = [], className = '', ...props }) => (
    <select className={`form-select ${className}`} {...props}>
        {options.map((option, index) => (
            <option key={index} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
);

// ============================================================================
// NOTIFICATION COMPONENTS
// ============================================================================

export const Notification = ({
    type = 'info',
    title,
    message,
    onClose,
    autoClose = true
}) => {
    React.useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(onClose, 5000);
            return () => clearTimeout(timer);
        }
    }, [autoClose, onClose]);

    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    return (
        <motion.div
            className={`notification notification-${type}`}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
        >
            <div className="notification-icon">{icons[type]}</div>
            <div className="notification-content">
                {title && <div className="notification-title">{title}</div>}
                <div className="notification-message">{message}</div>
            </div>
            <button className="notification-close" onClick={onClose}>
                ×
            </button>
        </motion.div>
    );
};

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================

export const Section = ({
    children,
    className = '',
    animate = true,
    ...props
}) => (
    <motion.section
        className={`section ${className}`}
        initial={animate ? { opacity: 0, y: 50 } : {}}
        whileInView={animate ? { opacity: 1, y: 0 } : {}}
        viewport={animate ? { once: true, amount: 0.2 } : {}}
        transition={animate ? { duration: 0.6 } : {}}
        {...props}
    >
        {children}
    </motion.section>
);

export const Container = ({ children, className = '', ...props }) => (
    <div className={`container ${className}`} {...props}>
        {children}
    </div>
);

export const Grid = ({
    children,
    columns = 'auto',
    gap = 'medium',
    className = '',
    ...props
}) => (
    <div
        className={`grid grid-${columns} gap-${gap} ${className}`}
        {...props}
    >
        {children}
    </div>
);

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

export const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.2, ease: "easeIn" }
    }
};

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

export const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

export const slideInVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 }
};