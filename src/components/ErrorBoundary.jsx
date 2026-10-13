import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: '#0C131A',
          color: '#FFFFFF',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#EE592B', marginBottom: '1rem' }}>
            Oops! Something went wrong
          </h2>
          <p style={{ maxWidth: '500px', opacity: 0.8, marginBottom: '1.5rem', lineHeight: 1.6 }}>
            {this.state.error?.message || 'Failed to render store components.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              backgroundColor: '#E3F934',
              color: '#0C131A',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
