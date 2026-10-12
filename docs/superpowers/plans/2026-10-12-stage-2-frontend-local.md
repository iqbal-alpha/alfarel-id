# Stage 2: Front-end di Local (React + Vite) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Design Read**:
*"Reading this as: E-Catalog & WhatsApp Fast Checkout apparel store for young adults (15–40 years old), with a chill, breezy coastal/beach vibe, leaning toward clean warm-minimalist typography, organic sand & seafoam ocean tones, tactile micro-interactions, and mobile-first frictionless commerce."*

**Goal**: Build a complete, functional, highly polished local front-end for AlfaREL.ID Store using React + Vite + Vanilla CSS tokens, incorporating instant search, category filtering, local storage mini cart, WhatsApp order generator with flat shipping, bilingual support, and lightweight admin preview.

---

## File Structure Plan
```text
c:/Users/ASUS/Documents/Antigravity/Apparel/
├── index.html                           # App shell, Google Fonts (Plus Jakarta Sans, Outfit), meta tags
├── package.json                         # Dependencies (react, react-dom, lucide-react) & build scripts
├── vite.config.js                       # Vite configuration
├── src/
│   ├── main.jsx                         # React entrypoint
│   ├── App.jsx                          # Main view router / layout (Catalog, Product Modal, Cart, Admin toggle)
│   ├── index.css                        # Design tokens (warm sand, seafoam, ocean slate, sunset coral, typography)
│   ├── i18n/
│   │   ├── translations.js              # ID & EN dictionaries
│   │   └── LanguageContext.jsx          # Context provider for bilingual switching
│   ├── data/
│   │   └── mockProducts.js              # Rich coastal apparel dataset with images, sizes, stock status
│   ├── context/
│   │   └── CartContext.jsx              # LocalStorage reactive cart state
│   ├── components/
│   │   ├── AnnouncementBar.jsx          # Top promo bar & language switch
│   │   ├── Header.jsx                   # Sticky navbar with logo, search trigger, cart badge
│   │   ├── HeroBanner.jsx               # Chill coastal resort hero showcase
│   │   ├── CategoryFilter.jsx           # Horizontal scrollable category chips
│   │   ├── SearchBar.jsx                # Real-time search with clear & counter
│   │   ├── StockBadge.jsx               # Status indicators (Ready, Low Stock, PO, Sold Out)
│   │   ├── ProductCard.jsx              # 4:5 aspect ratio card with quick-add
│   │   ├── ProductDetailModal.jsx       # Bottom sheet / modal with size selector & description
│   │   ├── FloatingCartButton.jsx       # Floating badge button on bottom-right
│   │   ├── CartDrawer.jsx               # Slide-over cart drawer with quantity & notes
│   │   ├── CheckoutModal.jsx            # WhatsApp form with flat shipping calculation
│   │   └── AdminPanel.jsx               # PIN-protected lightweight product CRUD & store settings
└── docs/superpowers/plans/
    └── 2026-10-12-stage-2-frontend-local.md
```

---

## Tasks Breakdown

- [x] **Task 1: Project Scaffolding & Design System Foundation**
  - Initialize React + Vite project structure with dependencies (`lucide-react`).
  - Configure `index.html` with viewport meta, proper title, Google Fonts (*Plus Jakarta Sans* & *Outfit*).
  - Implement full design system in `src/index.css` (color tokens, shadows, typography, micro-interactions).
  - Create `src/i18n/translations.js` and `src/i18n/LanguageContext.jsx` for ID & EN support.

- [x] **Task 2: Apparel Mock Dataset (Chill & Beach Collections)**
  - Create `src/data/mockProducts.js` containing categories and 12 detailed products across:
    - *Linen Beach Shirts*
    - *Boardshorts*
    - *Relaxed Tees*
    - *Beach Accessories*
  - Include realistic prices, compare-at prices, multiple sizes, stock statuses, and high-res Unsplash beach apparel images.

- [x] **Task 3: Cart Context with LocalStorage Persistence**
  - Implement `src/context/CartContext.jsx` with actions: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `setNote`.
  - Ensure zero-login persistence in `localStorage` under key `alfarel_cart_v1`.

- [x] **Task 4: Header, Announcement Bar & Hero Showcase**
  - Build `AnnouncementBar.jsx` with promo notice and language switcher.
  - Build `Header.jsx` with responsive layout, logo, search toggle, and cart trigger.
  - Build `HeroBanner.jsx` with chill beach atmosphere, headline, and "Jelajahi Koleksi" CTA.

- [x] **Task 5: Instant Search, Category Filter & Stock Badges**
  - Build `CategoryFilter.jsx` with scrollable chips and active state.
  - Build `SearchBar.jsx` with instant real-time filtering, clear button, and result counts.
  - Build `StockBadge.jsx` for Ready Stock, Low Stock, Pre-Order, and Sold Out.

- [x] **Task 6: Product Card Grid & Interactive Product Modal**
  - Build `ProductCard.jsx` with 4:5 image ratio, hover effects, stock badges, price, and quick action.
  - Build `ProductDetailModal.jsx` with image gallery, size picker (S, M, L, XL), material highlights, and add-to-cart feedback.

- [x] **Task 7: Floating Mini Cart & Slide-Over Drawer**
  - Build `FloatingCartButton.jsx` displaying total items and subtotal badge.
  - Build `CartDrawer.jsx` with slide-over animation, item list, quantity adjusters, delete button, notes input, and subtotal.

- [x] **Task 8: WhatsApp Order Generator with Flat Shipping**
  - Build `CheckoutModal.jsx` with customer name, phone, address, city/district, courier selection, and 3 flat shipping zones (Jabodetabek Rp 10k, Jawa Luar-Jabodetabek Rp 18k, Luar Jawa Rp 30k).
  - Calculate Subtotal + Shipping = Total Akhir.
  - Format WhatsApp message string and open `wa.me/{ADMIN_PHONE}` link.

- [x] **Task 9: Lightweight Admin Panel Preview**
  - Build `AdminPanel.jsx` with PIN login lock screen (`1234` default demo).
  - Implement product listing, stock status toggle, price editing, new product addition, and store settings (WhatsApp number & promo banner).

- [x] **Task 10: Verification & Build Validation**
  - Verify build with `cmd /c "npm run build"`.
  - Launch dev server and verify in browser at `http://localhost:3000/`.
