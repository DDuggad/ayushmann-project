import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../UI';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });

        // Log error to external service in production
        if (process.env.NODE_ENV === 'production') {
            this.logErrorToService(error, errorInfo);
        }
    }

    logErrorToService = (error, errorInfo) => {
        // Here you would typically send to an error tracking service
        console.error('Error logged to service:', { error, errorInfo });
    };

    render() {
        if (this.state.hasError) {
            return (
                <motion.div
                    className="error-boundary"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <div className="error-content">
                        <motion.div
                            className="error-icon"
                            animate={{
                                rotate: [0, -10, 10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            🌿💔
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Oops! Something went wrong
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            We're sorry, but something unexpected happened in the AyushMann application.
                            Don't worry - your data is safe!
                        </motion.p>

                        <motion.div
                            className="error-actions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Button
                                variant="primary"
                                icon="🔄"
                                onClick={() => window.location.reload()}
                            >
                                Refresh Page
                            </Button>
                            <Button
                                variant="secondary"
                                icon="🏠"
                                onClick={() => window.location.href = '/'}
                            >
                                Go Home
                            </Button>
                        </motion.div>

                        {process.env.NODE_ENV === 'development' && (
                            <details className="error-details">
                                <summary>Technical Details (Development Mode)</summary>
                                <pre>{this.state.error && this.state.error.toString()}</pre>
                                <pre>{this.state.errorInfo.componentStack}</pre>
                            </details>
                        )}
                    </div>
                </motion.div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;