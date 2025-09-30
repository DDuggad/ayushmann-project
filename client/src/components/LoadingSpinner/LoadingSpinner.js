import React from 'react';
import { motion } from 'framer-motion';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
    return (
        <div className="loading-spinner-container">
            <motion.div
                className={`loading-spinner ${size}`}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
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
};

export default LoadingSpinner;