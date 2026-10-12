import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export const CategoryFilter = ({ categories, activeCategory, onSelectCategory, counts }) => {
  const { lang, t } = useLanguage();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      overflowX: 'auto',
      padding: '0.25rem 0 0.5rem',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch'
    }}>
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        const name = lang === 'en' ? cat.name_en : cat.name_id;
        const count = counts[cat.id] || 0;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.875rem',
              fontWeight: isActive ? 700 : 500,
              backgroundColor: isActive ? 'var(--color-primary)' : 'var(--bg-surface)',
              color: isActive ? 'var(--text-white)' : 'var(--text-secondary)',
              border: '1px solid',
              borderColor: isActive ? 'var(--color-primary)' : 'var(--bg-muted)',
              boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
              transition: 'all var(--transition-fast)',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'var(--color-seafoam)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'var(--bg-muted)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }
            }}
          >
            <span>{name}</span>
            <span style={{
              fontSize: '0.6875rem',
              padding: '0.1rem 0.4rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--bg-subtle)',
              color: isActive ? 'var(--text-white)' : 'var(--text-tertiary)',
              fontWeight: 600
            }}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
