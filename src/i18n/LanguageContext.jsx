import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang] = useState('en');

  useEffect(() => {
    try {
      localStorage.setItem('alfarel_lang', 'en');
      document.documentElement.lang = 'en';
    } catch (e) {
      console.warn('Unable to persist language in localStorage', e);
    }
  }, []);

  const t = (key) => {
    const dict = translations.en || {};
    return dict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      lang: 'en',
      language: 'en',
      setLang: () => {},
      setLanguage: () => {},
      toggleLang: () => {},
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
