import React from 'react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <motion.div
                    className="error-boundary"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="error-content">
                        <div className="error-icon">🌿💔</div>
                        <h1>Oops! Something went wrong</h1>
                        <p>We're sorry, but something unexpected happened in the AyushMann application.</p>

                        <div className="error-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => window.location.reload()}
                            >
                                🔄 Refresh Page
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => window.location.href = '/'}
                            >
                                🏠 Go Home
                            </button>
                        </div>

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