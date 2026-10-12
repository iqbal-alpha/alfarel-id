import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export const StockBadge = ({ status }) => {
  const { t } = useLanguage();

  switch (status) {
    case 'ready':
      return <span className="badge badge-ready">{t('stock_ready')}</span>;
    case 'low_stock':
      return <span className="badge badge-low">{t('stock_low')}</span>;
    case 'pre_order':
      return <span className="badge badge-po">{t('stock_po')}</span>;
    case 'sold_out':
      return <span className="badge badge-soldout">{t('stock_soldout')}</span>;
    default:
      return null;
  }
};
