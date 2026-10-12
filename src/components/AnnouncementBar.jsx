import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Globe } from 'lucide-react';

export const AnnouncementBar = ({ announcementText }) => {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <div style={{
      backgroundColor: 'var(--color-primary)',
      color: 'var(--text-white)',
      fontSize: '0.75rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
      padding: '0.45rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 40
    }}>
      <div style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        flex: 1,
        textAlign: 'center',
        paddingRight: '1rem'
      }}>
        <span>{announcementText || t('announcement')}</span>
      </div>

      <button
        onClick={toggleLang}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.2rem 0.55rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          color: 'var(--text-white)',
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          transition: 'background var(--transition-fast)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
        title="Ganti Bahasa / Switch Language"
      >
        <Globe size={12} />
        <span>{lang.toUpperCase()}</span>
      </button>
    </div>
  );
};
