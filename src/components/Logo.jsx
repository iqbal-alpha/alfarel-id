import React from 'react';

export const Logo = ({ size = 'normal', variant = 'dark' }) => {
  const isLight = variant === 'light';
  const textColor = isLight ? '#FFFFFF' : 'var(--text-primary)';
  const accentColor = isLight ? 'var(--color-seafoam)' : 'var(--color-primary)';
  const subColor = isLight ? 'rgba(255, 255, 255, 0.65)' : 'var(--text-tertiary)';
  const iconBg = isLight ? 'rgba(255, 255, 255, 0.12)' : 'var(--color-seafoam-light)';
  const iconStroke = isLight ? '#FFFFFF' : 'var(--color-primary)';

  const markSize = size === 'large' ? 40 : 34;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.65rem',
      userSelect: 'none',
      textDecoration: 'none'
    }}>
      {/* Bespoke Geometric Coastal Monomark */}
      <div style={{
        width: `${markSize}px`,
        height: `${markSize}px`,
        borderRadius: 'var(--radius-sm)',
        backgroundColor: iconBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        border: `1px solid ${isLight ? 'rgba(255, 255, 255, 0.2)' : 'rgba(98, 182, 168, 0.35)'}`,
        transition: 'transform var(--transition-fast)'
      }}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Minimalist Sun Horizon Arch */}
          <path
            d="M5 13C5 9.13401 8.13401 6 12 6C15.866 6 19 13 19 13"
            stroke={accentColor}
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          {/* Horizon Line */}
          <path
            d="M3 14H21"
            stroke={iconStroke}
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          {/* Subtle Minimalist Wave Ripple */}
          <path
            d="M5 18C7 16.8 9 19.2 12 18C15 16.8 17 19.2 19 18"
            stroke={accentColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Proportional Brand Typography Lockup */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: size === 'large' ? '1.35rem' : '1.1875rem',
          letterSpacing: '0.04em'
        }}>
          <span style={{ color: textColor }}>ALFAREL</span>
          <span style={{
            color: accentColor,
            fontWeight: 700,
            marginLeft: '1px'
          }}>
            .ID
          </span>
        </div>

        <span style={{
          fontSize: '0.5875rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: subColor,
          marginTop: '2px'
        }}>
          Coastal Apparel
        </span>
      </div>
    </div>
  );
};
