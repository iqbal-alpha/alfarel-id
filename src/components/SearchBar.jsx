import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Search, X } from 'lucide-react';

export const SearchBar = ({ searchQuery, setSearchQuery, inputRef }) => {
  const { t } = useLanguage();

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '480px'
    }}>
      <div style={{
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--text-tertiary)',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none'
      }}>
        <Search size={18} />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t('search_placeholder')}
        style={{
          width: '100%',
          padding: '0.7rem 2.5rem 0.7rem 2.75rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--bg-muted)',
          backgroundColor: 'var(--bg-surface)',
          fontSize: '0.9rem',
          color: 'var(--text-primary)',
          outline: 'none',
          boxShadow: 'var(--shadow-xs)',
          transition: 'all var(--transition-fast)'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--color-primary)';
          e.target.style.boxShadow = '0 0 0 3px rgba(30, 107, 123, 0.12)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--bg-muted)';
          e.target.style.boxShadow = 'var(--shadow-xs)';
        }}
      />

      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          style={{
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '0.25rem',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-subtle)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background var(--transition-fast)'
          }}
          title={t('search_reset')}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};
