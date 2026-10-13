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
      const isDev = Boolean(import.meta.env?.DEV);

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
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.15em',
            color: 'var(--bg-ticker)',
            textTransform: 'uppercase',
            marginBottom: '0.5rem'
          }}>
            ALFAREL.ID • COASTAL APPAREL
          </div>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '0.75rem'
          }}>
            A Temporary Breeze in the Current
          </h2>
          <p style={{
            maxWidth: '520px',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '1.75rem',
            lineHeight: 1.6,
            fontSize: '0.95rem'
          }}>
            {isDev
              ? (this.state.error?.message || 'An unexpected rendering error occurred.')
              : 'We encountered a minor hiccup presenting this collection piece. Your cart items are saved locally.'}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '9999px',
                backgroundColor: 'var(--bg-ticker)',
                color: '#0C131A',
                fontWeight: 800,
                fontSize: '0.85rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Reload Store
            </button>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer'
              }}
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
