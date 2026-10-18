# AlfaREL.ID Store — High-End Coastal Apparel Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-alfarel--id.pages.dev-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://alfarel-id.pages.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL%20RLS-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vitest](https://img.shields.io/badge/Tests-14%2F14%20Passing-729B1B?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![WCAG](https://img.shields.io/badge/Accessibility-WCAG%20AA%20Compliant-1E6B7B?style=flat-square)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

Live Deployment: [https://alfarel-id.pages.dev](https://alfarel-id.pages.dev/)

AlfaREL.ID Store is a high-performance e-commerce storefront built for coastal streetwear and resort apparel. The platform combines editorial typography, zero-bloat design tokens, frictionless direct WhatsApp checkout, real-time Supabase inventory synchronization, and WCAG AA accessibility compliance.

---

## Visual Showcase

### Desktop and Mobile Overview

| Desktop Experience (1440px) | Mobile Experience (390px) |
| :---: | :---: |
| ![Desktop Preview](screenshots/preview.png) | ![Mobile Preview](screenshots/mobile_preview.png) |

---

## Core Sections and Architecture

### 1. Editorial Hero

The hero section features multi-layered composition with oversized brand typography, model cutout integration, live metadata tags, and smooth directional call-to-actions.

![Editorial Hero](screenshots/01-hero-editorial.png)

---

### 2. Brand Narrative

An asymmetric three-column layout presenting brand origins, sustainable linen sourcing philosophies, and editorial photography.

![Brand Narrative](screenshots/02-about-editorial.png)

---

### 3. Top Collection Series

Numbered capsule showcases featuring numbered drop indicators, structured metadata, and balanced typography.

![Top Collection](screenshots/03-top-collection.png)

---

### 4. Featured Product Carousel

A horizontal product slider set against a warm terracotta canvas, with interactive variant previews and quick-add actions.

![Featured Product Carousel](screenshots/04-featured-carousel.png)

---

### 5. Twilight Mood Gallery

A high-contrast deep ocean slate section incorporating layered ghost typography and asymmetric polaroid compositions.

![Twilight Mood Gallery](screenshots/05-mood-gallery.png)

---

### 6. Signature Curations

An interactive curation showcase pairing real-time category triggers with dedicated preview cards and instant category filtering.

![Signature Curations](screenshots/06-curations-showcase.png)

---

### 7. Flagship Product Configurator

An interactive spotlight module featuring dynamic color swatches, size selectors, real-time stock status, and direct cart insertion.

![Product Configurator](screenshots/07-product-spotlight.png)

---

### 8. Next Drop Campaign

A full-width atmospheric banner for upcoming seasonal drops with high-contrast call-to-action routing.

![Next Drop Banner](screenshots/08-next-drop-banner.png)

---

### 9. Filterable Catalog and Instant Search

A client-side catalog with zero-latency bilingual search, category filters, real-time stock indicators, and accessible keyboard-navigable product cards.

![E-Commerce Catalog](screenshots/09-ecommerce-catalog.png)

---

### 10. Philosophy Statement and Dual Footer

Brand manifesto and dual black-and-white editorial portraits, complete with structured navigation links and customer service routes.

![Philosophy and Footer](screenshots/10-philosophy-footer.png)

---

## Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| Frontend Framework | React 18 | Component architecture, Context API, state management |
| Build Tool | Vite 6 | Development server, Rollup bundle optimization, code-splitting |
| Styling | Vanilla CSS Tokens | Zero-runtime CSS custom properties for typography, spacing, and color palettes |
| Icons | Lucide React | Lightweight SVG iconography |
| Backend & Database | Supabase (PostgreSQL) | Row-Level Security (RLS), real-time stock synchronization |
| Authentication | Web Crypto API (SHA-256) | Salted hash admin authentication for store management |
| Localization | Custom i18n Context | Dynamic English and Bahasa Indonesia language switching |
| Testing Suite | Vitest + React Testing Library | Automated unit, accessibility, and integration tests |
| Accessibility | WCAG AA 2.1 | ARIA dialog attributes, focus visible rings, keyboard traps (Escape/Enter) |

---

## Repository Structure

```text
├── public/                     # Static assets, fonts, and headers
│   ├── images/editorial/       # Editorial and mood photography
│   ├── images/products/        # Product catalog imagery
│   ├── _headers                # Security and caching headers (Cloudflare)
│   └── _redirects              # SPA routing rewrite rule
├── screenshots/                # Visual documentation assets
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── AboutSection.jsx
│   │   ├── AdminPanel.jsx      # Protected store administration
│   │   ├── CartDrawer.jsx      # Shopping cart drawer
│   │   ├── CheckoutModal.jsx   # WhatsApp checkout flow
│   │   ├── CuratedBrandsSection.jsx
│   │   ├── EditorialHero.jsx
│   │   ├── EditorialMoodGallery.jsx
│   │   ├── FeaturedProductsSection.jsx
│   │   ├── Header.jsx
│   │   ├── NextDropBanner.jsx
│   │   ├── PhilosophyFooterSection.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetailModal.jsx
│   │   ├── ProductSpotlightSection.jsx
│   │   └── ...
│   ├── context/                # CartContext with localStorage persistence
│   ├── data/                   # Initial catalog and fallback dataset
│   ├── i18n/                   # Language definitions (EN / ID)
│   ├── lib/                    # Supabase client and WhatsApp payload builder
│   ├── __tests__/              # Automated test suites
│   ├── App.jsx                 # Application layout and routing
│   └── index.css               # Global design system tokens
├── supabase/
│   ├── migrations/             # Database schemas and security policies
│   └── seed.sql                # Initial dataset
├── index.html                  # HTML entry point
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iqbal-alpha/alfarel-id.git
   cd alfarel-id
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Set up your Supabase and WhatsApp details:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_STORE_WHATSAPP=6281234567890
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:3000`.

---

## Testing and Quality Assurance

Run the automated test suite covering cart state transitions, accessibility compliance, and WhatsApp payload generation:

```bash
npm test
```

Test coverage includes:
- Cart persistence and quantity mutation
- Modal accessibility (`role="dialog"`, `aria-modal="true"`, Escape key handling)
- Keyboard interaction on product cards
- WhatsApp message formatting and markdown sanitization
- Admin authentication verification

---

## Deployment

The application is deployed on Cloudflare Pages:

- Production URL: [https://alfarel-id.pages.dev](https://alfarel-id.pages.dev/)
- Build Command: `npm run build`
- Output Directory: `dist`
- SPA Routing: Handled via `public/_redirects`
- Security Headers: Configured via `public/_headers` (Content-Security-Policy, X-Frame-Options, Referrer-Policy)

---

## License

This project is licensed under the MIT License.
