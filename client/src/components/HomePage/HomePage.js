import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LandingPage from '../../pages/LandingPage/LandingPage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const HomePage = () => {
    const { isAuthenticated, user, loading } = useAuth();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, var(--neutral-cream) 0%, var(--primary-50) 100%)'
            }}>
                <LoadingSpinner message="Loading AyushMann..." />
            </div>
        );
    }

    // If user is authenticated, redirect to their dashboard
    if (isAuthenticated && user) {
        if (user.role === 'patient') {
            return <Navigate to="/patient/dashboard" replace />;
        } else if (user.role === 'practitioner') {
            return <Navigate to="/practitioner/dashboard" replace />;
        }
    }

    // If not authenticated, show landing page
    return <LandingPage />;
};

export default HomePage;