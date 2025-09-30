import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LandingPage from '../../pages/LandingPage/LandingPage';
import { PageLoader } from '../UI';

const HomePage = () => {
    const { isAuthenticated, user, loading } = useAuth();

    // Show loading spinner while checking authentication
    if (loading) {
        return <PageLoader message="Loading AyushMann..." />;
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