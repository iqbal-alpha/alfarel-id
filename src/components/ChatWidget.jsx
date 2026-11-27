import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { StockBadge } from './StockBadge';
import { buildWhatsAppUrl, formatPriceIDR } from '../lib/whatsapp';
import { MAX_MESSAGE_LENGTH, MAX_HISTORY_MESSAGES } from '../lib/chatAssistant';
import {
  MessageSquare,
  X,
  ArrowUp,
  RotateCcw,
  ShoppingBag,
  MessageCircle,
  Eye
} from 'lucide-react';

const QUICK_PROMPTS = [
  'Breezy linen shirts?',
  'Check stock & promo',
  'Shipping rates & checkout',
  'Beach outfit recommendation'
];

const MAX_SESSION_QUESTIONS = 20;
const COOLDOWN_MS = 1500;

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  isSynthetic: true,
  content:
    'Welcome to AlfaREL.ID. Ask about live stock, sizing, linen fabrics, shipping rates, or coastal styling.',
  productIds: [],
  suggestWhatsApp: false
};

export const ChatWidget = ({ products = [], storeSettings = {}, onSelectProduct }) => {
  const { lang } = useLanguage();
  const { addToCart } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [userQuestionsCount, setUserQuestionsCount] = useState(0);
  const [fallbackWaNumber, setFallbackWaNumber] = useState('');

  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const messagesEndRef = useRef(null);
  const shouldRestoreFocusRef = useRef(false);
  const cooldownTimerRef = useRef(null);
  const nextIdRef = useRef(1);

  const nextMsgId = (prefix) => `${prefix}-${nextIdRef.current++}`;

  const productMap = useMemo(() => {
    const map = new Map();
    for (const p of products) {
      const isActive = p?.isActive !== undefined ? Boolean(p.isActive) : p?.is_active !== false;
      if (p && isActive && p.id !== undefined && String(p.id).trim()) {
        map.set(String(p.id), p);
      }
    }
    return map;
  }, [products]);

  const isStoreOpen =
    storeSettings?.isStoreOpen !== false && storeSettings?.is_store_open !== false;

  const effectiveWaNumber =
    storeSettings?.whatsappNumber ||
    storeSettings?.whatsapp_number ||
    fallbackWaNumber ||
    '6281234567890';

  const whatsappDirectHref = buildWhatsAppUrl(
    effectiveWaNumber,
    'Hello AlfaREL.ID, I would like to ask about your coastal apparel collection.'
  );

  const isSessionLimitReached = userQuestionsCount >= MAX_SESSION_QUESTIONS;

  const closeDialog = (restoreFocus = true) => {
    shouldRestoreFocusRef.current = restoreFocus;
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      if (shouldRestoreFocusRef.current) {
        shouldRestoreFocusRef.current = false;
        launcherRef.current?.focus();
      }
      return;
    }

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !document.querySelector('[aria-modal="true"]')) {
        closeDialog(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      messagesEndRef.current?.scrollIntoView?.({
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  const handleReset = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput('');
    setUserQuestionsCount(0);
    setIsCoolingDown(false);
    if (cooldownTimerRef.current) {
      clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = null;
    }
  };

  const sendMessage = async (rawText) => {
    const trimmed = String(rawText || '').trim();
    if (!trimmed || isLoading || isCoolingDown || isSessionLimitReached) return;
    if (trimmed.length > MAX_MESSAGE_LENGTH) return;

    const nextCount = userQuestionsCount + 1;
    const userMsg = {
      id: nextMsgId('user'),
      role: 'user',
      content: trimmed
    };

    const historyForApi = messages
      .filter((m) => !m.isSynthetic && (m.role === 'user' || m.role === 'assistant'))
      .slice(-MAX_HISTORY_MESSAGES)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setUserQuestionsCount(nextCount);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historyForApi,
          lang
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data?.whatsappNumber) {
          setFallbackWaNumber(data.whatsappNumber);
        }
        const errorMessage =
          response.status === 429
            ? 'Our stylist assistant is currently busy. Continue directly with our store team on WhatsApp below.'
            : 'The stylist assistant is temporarily unavailable. Reach our WhatsApp team directly for fast help.';

        setMessages((prev) => [
          ...prev,
          {
            id: nextMsgId('err'),
            role: 'assistant',
            isSynthetic: true,
            content: errorMessage,
            productIds: [],
            suggestWhatsApp: true
          }
        ]);
        return;
      }

      const replyMessages = [
        {
          id: nextMsgId('bot'),
          role: 'assistant',
          content: data.reply || 'Here is what I found in our collection.',
          productIds: Array.isArray(data.productIds) ? data.productIds : [],
          suggestWhatsApp: Boolean(data.suggestWhatsApp)
        }
      ];

      if (nextCount >= MAX_SESSION_QUESTIONS) {
        replyMessages.push({
          id: nextMsgId('limit'),
          role: 'assistant',
          isSynthetic: true,
          content:
            'You have reached the quick-chat session limit. Continue directly on WhatsApp for personal styling and order support.',
          productIds: [],
          suggestWhatsApp: true
        });
      }

      setMessages((prev) => [...prev, ...replyMessages]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextMsgId('net'),
          role: 'assistant',
          isSynthetic: true,
          content:
            'Connection interrupted. You can browse the catalog or message our team directly on WhatsApp.',
          productIds: [],
          suggestWhatsApp: true
        }
      ]);
    } finally {
      setIsLoading(false);
      setIsCoolingDown(true);
      if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(() => {
        setIsCoolingDown(false);
      }, COOLDOWN_MS);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const isSendDisabled = isLoading || isCoolingDown || isSessionLimitReached || !input.trim();

  return (
    <>
      {/* Minimalist Bottom-Left Launcher (Quiet Luxury Frosted Linen) */}
      {!isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.25rem',
            left: '1.25rem',
            zIndex: 55
          }}
        >
          <button
            ref={launcherRef}
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Ask AlfaREL Stylist"
            aria-expanded={isOpen}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              minHeight: '46px',
              padding: '0.65rem 1.05rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(251, 249, 245, 0.94)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              color: 'var(--text-primary)',
              border: '1px solid rgba(15, 40, 56, 0.14)',
              boxShadow: '0 8px 24px rgba(15, 40, 56, 0.08), 0 1px 3px rgba(15, 40, 56, 0.04)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.8125rem',
              letterSpacing: '0.01em',
              transition: 'transform var(--transition-fast), border-color var(--transition-fast), background-color var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.borderColor = 'var(--text-primary)';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(15, 40, 56, 0.14)';
              e.currentTarget.style.backgroundColor = 'rgba(251, 249, 245, 0.94)';
            }}
          >
            <MessageSquare size={16} strokeWidth={1.75} color="var(--color-primary)" />
            <span>Ask Stylist</span>
          </button>
        </div>
      )}

      {/* Minimalist Editorial Concierge Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="AlfaREL AI Coastal Concierge"
          style={{
            position: 'fixed',
            bottom: '1.25rem',
            left: '1.25rem',
            zIndex: 95,
            width: 'min(388px, calc(100vw - 2rem))',
            height: 'min(560px, calc(100dvh - 2.5rem))',
            backgroundColor: '#FBF9F5',
            borderRadius: '14px',
            border: '1px solid rgba(15, 40, 56, 0.1)',
            boxShadow: '0 22px 52px rgba(15, 40, 56, 0.11), 0 4px 12px rgba(15, 40, 56, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUp 220ms cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Quiet Editorial Header */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              padding: '0.85rem 0.9rem 0.85rem 1.15rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              borderBottom: '1px solid rgba(15, 40, 56, 0.08)'
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.15rem'
                }}
              >
                ALFAREL.ID ATELIER
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.975rem',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                    color: 'var(--text-primary)'
                  }}
                >
                  Style Concierge
                </h2>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.68rem',
                    fontWeight: 500,
                    color: 'var(--color-primary)'
                  }}
                >
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary)'
                    }}
                  />
                  <span>Live</span>
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
              <button
                type="button"
                onClick={handleReset}
                aria-label="Reset conversation"
                title="Reset conversation"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'background-color var(--transition-fast), color var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <RotateCcw size={15} strokeWidth={1.6} />
              </button>
              <button
                type="button"
                onClick={() => closeDialog(true)}
                aria-label="Close chat assistant"
                title="Close chat assistant"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'background-color var(--transition-fast), color var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <X size={18} strokeWidth={1.6} />
              </button>
            </div>
          </div>

          {/* Subtle Store Paused Strip */}
          {!isStoreOpen && (
            <div
              style={{
                backgroundColor: 'var(--color-coral-light)',
                color: '#9F2F2D',
                fontSize: '0.73rem',
                fontWeight: 600,
                padding: '0.5rem 1.15rem',
                borderBottom: '1px solid rgba(15, 40, 56, 0.08)'
              }}
            >
              Orders are temporarily paused, but you can still ask about products and sizing.
            </div>
          )}

          {/* Conversation Canvas */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.15rem 1.1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.95rem'
            }}
          >
            {messages.map((msg, idx) => {
              const isUser = msg.role === 'user';
              const isWelcome = idx === 0 && msg.id === 'welcome';
              const matchedProducts = (msg.productIds || [])
                .map((id) => productMap.get(String(id)))
                .filter(Boolean);

              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                    gap: '0.55rem'
                  }}
                >
                  {isWelcome ? (
                    <div
                      style={{
                        width: '100%',
                        paddingBottom: '0.75rem',
                        borderBottom: '1px solid rgba(15, 40, 56, 0.08)',
                        color: 'var(--text-primary)',
                        fontSize: '0.86rem',
                        lineHeight: 1.6,
                        fontWeight: 400
                      }}
                    >
                      {msg.content}
                    </div>
                  ) : (
                    <div
                      style={{
                        maxWidth: '88%',
                        padding: '0.68rem 0.92rem',
                        borderRadius: isUser
                          ? '12px 12px 3px 12px'
                          : '12px 12px 12px 3px',
                        backgroundColor: isUser ? 'var(--text-primary)' : '#FFFFFF',
                        color: isUser ? '#FBF9F5' : 'var(--text-primary)',
                        border: isUser ? 'none' : '1px solid rgba(15, 40, 56, 0.08)',
                        boxShadow: isUser ? 'none' : '0 1px 2px rgba(15, 40, 56, 0.03)',
                        fontSize: '0.84rem',
                        lineHeight: 1.58,
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {msg.content}
                    </div>
                  )}

                  {/* Minimalist Architectural Product Cards */}
                  {!isUser && matchedProducts.length > 0 && (
                    <div
                      style={{
                        width: '100%',
                        maxWidth: '94%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}
                    >
                      {matchedProducts.map((product) => {
                        const title =
                          lang === 'id'
                            ? product.title_id || product.title_en
                            : product.title_en || product.title_id;
                        const stockStatus = product.stockStatus || product.stock_status || 'ready';
                        const isSoldOut = stockStatus === 'sold_out';
                        const sizes = product.sizes || product.available_sizes || [];
                        const colors = product.colors || product.available_colors || [];
                        const imgSrc =
                          product.images?.[0] || '/images/products/bali-breeze-shirt.jpg';

                        return (
                          <div
                            key={product.id}
                            style={{
                              display: 'flex',
                              gap: '0.75rem',
                              padding: '0.65rem',
                              borderRadius: '10px',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid rgba(15, 40, 56, 0.09)',
                              alignItems: 'center'
                            }}
                          >
                            <img
                              src={imgSrc}
                              alt={title}
                              style={{
                                width: '52px',
                                height: '66px',
                                borderRadius: '6px',
                                objectFit: 'cover',
                                flexShrink: 0,
                                backgroundColor: 'var(--bg-subtle)'
                              }}
                            />

                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  gap: '0.4rem',
                                  marginBottom: '0.2rem'
                                }}
                              >
                                <StockBadge status={stockStatus} />
                              </div>

                              <div
                                style={{
                                  fontFamily: 'var(--font-display)',
                                  fontSize: '0.82rem',
                                  fontWeight: 600,
                                  color: 'var(--text-primary)',
                                  lineHeight: 1.3,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {title}
                              </div>

                              <div
                                className="price-nums"
                                style={{
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  color: 'var(--text-primary)',
                                  marginTop: '0.12rem'
                                }}
                              >
                                IDR {formatPriceIDR(product.price)}
                              </div>

                              <div
                                style={{
                                  display: 'flex',
                                  gap: '0.4rem',
                                  marginTop: '0.45rem'
                                }}
                              >
                                <button
                                  type="button"
                                  aria-label={`View ${title}`}
                                  onClick={() => onSelectProduct?.(product)}
                                  style={{
                                    padding: '0.32rem 0.62rem',
                                    borderRadius: '6px',
                                    backgroundColor: 'var(--bg-primary)',
                                    border: '1px solid rgba(15, 40, 56, 0.1)',
                                    color: 'var(--text-primary)',
                                    fontSize: '0.72rem',
                                    fontWeight: 600,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.28rem',
                                    transition: 'border-color var(--transition-fast)'
                                  }}
                                >
                                  <Eye size={12} strokeWidth={1.7} />
                                  <span>Detail</span>
                                </button>

                                {!isSoldOut && (
                                  <button
                                    type="button"
                                    aria-label={`Add ${title} to bag`}
                                    onClick={() => {
                                      const firstSize = sizes[0] || 'All Size';
                                      const firstColor = colors[0] || '';
                                      addToCart(product, firstSize, firstColor, 1);
                                    }}
                                    style={{
                                      padding: '0.32rem 0.68rem',
                                      borderRadius: '6px',
                                      backgroundColor: 'var(--text-primary)',
                                      color: '#FBF9F5',
                                      fontSize: '0.72rem',
                                      fontWeight: 600,
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '0.28rem',
                                      transition: 'background-color var(--transition-fast)'
                                    }}
                                  >
                                    <ShoppingBag size={12} strokeWidth={1.7} />
                                    <span>+ Bag</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Restrained Sage-Linen WhatsApp Handover Button */}
                  {!isUser && msg.suggestWhatsApp && (
                    <a
                      href={whatsappDirectHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.52rem 0.88rem',
                        borderRadius: '8px',
                        backgroundColor: '#EAF8F0',
                        border: '1px solid rgba(29, 138, 86, 0.25)',
                        color: '#135E3A',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        transition: 'background-color var(--transition-fast)'
                      }}
                    >
                      <MessageCircle size={15} strokeWidth={1.7} />
                      <span>Chat Admin via WhatsApp</span>
                    </a>
                  )}
                </div>
              );
            })}

            {/* Minimal Quick Prompt Suggestions */}
            {messages.length === 1 && !isLoading && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.45rem',
                  marginTop: '0.1rem'
                }}
              >
                {QUICK_PROMPTS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => sendMessage(chip)}
                    style={{
                      padding: '0.45rem 0.72rem',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(15, 40, 56, 0.1)',
                      color: 'var(--text-primary)',
                      fontSize: '0.76rem',
                      fontWeight: 500,
                      transition: 'border-color var(--transition-fast), background-color var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(15, 40, 56, 0.1)';
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Quiet Checking Indicator */}
            {isLoading && (
              <div
                aria-live="polite"
                style={{
                  alignSelf: 'flex-start',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(15, 40, 56, 0.08)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.78rem',
                  fontWeight: 500
                }}
              >
                Checking catalog...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Clean Composer Footer */}
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid rgba(15, 40, 56, 0.08)',
              padding: '0.75rem 0.85rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                maxLength={MAX_MESSAGE_LENGTH}
                disabled={isLoading || isSessionLimitReached}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder={
                  isSessionLimitReached
                    ? 'Session limit reached — continue on WhatsApp'
                    : 'Ask about linen, sizing, shipping...'
                }
                aria-label="Ask a question about AlfaREL products"
                style={{
                  flex: 1,
                  padding: '0.62rem 0.85rem',
                  borderRadius: '10px',
                  border: '1px solid',
                  borderColor: isInputFocused ? 'var(--text-primary)' : 'rgba(15, 40, 56, 0.12)',
                  boxShadow: isInputFocused ? '0 0 0 2px rgba(15, 40, 56, 0.08)' : 'none',
                  backgroundColor: '#FBF9F5',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)'
                }}
              />
              <button
                type="submit"
                disabled={isSendDisabled}
                aria-label="Send message"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: isSendDisabled ? 'var(--bg-muted)' : 'var(--text-primary)',
                  color: isSendDisabled ? 'var(--text-tertiary)' : '#FBF9F5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  cursor: isSendDisabled ? 'not-allowed' : 'pointer',
                  transition: 'background-color var(--transition-fast), transform var(--transition-fast)'
                }}
              >
                <ArrowUp size={17} strokeWidth={1.85} />
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '0.4rem',
                padding: '0 0.15rem',
                fontSize: '0.67rem',
                color: 'var(--text-tertiary)'
              }}
            >
              <span>Live catalog · Avoid sharing personal details</span>
              {input.length > 300 && (
                <span>
                  {input.length}/{MAX_MESSAGE_LENGTH}
                </span>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
};
