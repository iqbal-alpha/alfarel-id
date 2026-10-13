# AlfaREL.ID Front-End Redesign Implementation Plan (Referensi.webp 1:1 Translation)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the AlfaREL.ID front-end to match the 1:1 structural layout and high-fashion editorial cadence of `referensi.webp`, translated into the Breezy Daylight Sand & Ocean chill coastal apparel identity with bespoke AI-generated model photography and seamless WhatsApp checkout.

**Architecture:** Modular React 18 component architecture mirroring all 11 sections of `referensi.webp`: Header, Giant Condensed Hero, Marquee Ticker, About Section, Top Collections [001]/[002], Featured Products Carousel (Terracotta), Dark Twilight Mood Gallery, Interactive Curated Categories list with hover preview, Spotlight Product Configurator with live color selector, Next Drop Banner, and Philosophy Editorial Footer. Retains full integration with CartDrawer, WhatsApp Fast Checkout, Search, and AdminPanel.

**Tech Stack:** React 18, Vite, Lucide-React, Vanilla CSS Design Tokens (Plus Jakarta Sans, Outfit, Antonio/Bebas Neue for condensed impact typography).

**Spec:** `docs/superpowers/specs/2026-10-12-alfarel-reference-redesign-design.md`

## Global Constraints
- Structural and visual 1:1 parity with `referensi.webp`.
- Brand identity: AlfaREL.ID ("Wear The Vacation Feeling").
- Zero generic placeholder boxes or blurry images: all model photos generated via `generate_image`.
- Zero broken e-commerce flows: CartDrawer, WhatsApp Fast Checkout, ProductDetailModal, Search, and AdminPanel must continue working flawlessly.
- Zero horizontal overflow on mobile viewports (320px–430px).

## Review Focus
1. Ticker animation must be seamless and not cause horizontal layout shifts.
2. Hover preview on Curated Collections must not jitter or clip outside container on mobile devices.
3. Color swatch switching on Spotlight Section must update selected color state and trigger add-to-cart with chosen color.
4. Featured products carousel buttons (`<` and `>`) must smoothly slide products horizontally.
5. WhatsApp order message generator must properly capture selected product attributes from new sections.

---

### Task 1: Generate High-End Editorial Coastal Streetwear Assets
**Files:**
- Create: `public/images/editorial/*`
- Create: `src/data/editorialAssets.js`
- Modify: `src/data/mockProducts.js`

**Interfaces:**
- Produces: `editorialAssets` map containing image URLs for hero, about, top collections, mood gallery, spotlight, drop banner, and footer portraits.

- [ ] **Step 1.1: Generate Hero Model Portrait**
  - Run `generate_image` with prompt for high-fashion coastal streetwear male model wearing red knit beanie and relaxed crimson sweatshirt against cinematic dark studio backdrop.
  - Save to `public/images/editorial/hero-model.webp`.

- [ ] **Step 1.2: Generate About & Top Collection Portraits**
  - Generate model in warm red studio light for About section (`public/images/editorial/about-model.webp`).
  - Generate model `[001]` wearing chic red resort hat (`public/images/editorial/collection-001.webp`).
  - Generate model `[002]` close-up wearing retro red sunglasses (`public/images/editorial/collection-002.webp`).

- [ ] **Step 1.3: Generate Mood Gallery & Spotlight Model Images**
  - Generate model looking upward with sunglasses and warm sunset backlight (`public/images/editorial/mood-01.webp`).
  - Generate model in breezy beach light with orange tint (`public/images/editorial/mood-02.webp`).
  - Generate model wearing relaxed resort shirt sitting casually on wooden stool (`public/images/editorial/spotlight-model.webp`).
  - Generate dynamic motion model with visor sunglasses for next drop banner (`public/images/editorial/drop-banner.webp`).
  - Generate 2 high-contrast B&W editorial portraits for footer manifesto (`public/images/editorial/bw-quote-1.webp`, `public/images/editorial/bw-quote-2.webp`).

- [ ] **Step 1.4: Define `editorialAssets.js` and link into `mockProducts.js`**
  - Verify all image paths load correctly.

---

### Task 2: Global CSS Design Tokens & Condensed Typography Setup
**Files:**
- Modify: `index.html`
- Modify: `src/index.css`

**Interfaces:**
- Produces: Typography classes (`.font-condensed`, `.font-editorial`), CSS variables (`--bg-sand`, `--bg-twilight`, `--bg-sunset`, `--bg-ticker`), and smooth keyframe animations.

- [ ] **Step 2.1: Add Google Fonts in `index.html`**
  - Add `Bebas Neue` and `Antonio` alongside `Outfit` and `Plus Jakarta Sans`.

- [ ] **Step 2.2: Implement Design System Tokens in `src/index.css`**
  - Define custom properties for Sand Linen canvas, Deep Twilight Midnight, Vibrant Sunset Terracotta, and Citrus Ticker.
  - Implement marquee animation keyframe `@keyframes marquee`.
  - Add responsive grid utilities and custom scrollbars.

---

### Task 3: Editorial Header & Marquee Ticker Components
**Files:**
- Modify: `src/components/Header.jsx`
- Create: `src/components/MarqueeTicker.jsx`

**Interfaces:**
- Consumes: Cart count from `CartContext`, search toggle handler, admin panel trigger.
- Produces: Sticky top bar matching `referensi.webp` with "ALFAREL.ID", navigation links, language toggle, and "ORDER NOW →" button.

- [ ] **Step 3.1: Build `MarqueeTicker.jsx`**
  - Continuous horizontal infinite scroll with text: "COASTAL STREETWEAR • RESORT APPAREL • BREEZY LINEN COLLECTION • FAST WHATSAPP CHECKOUT • 100% ORGANIC COTTON • UP TO 20% OFF FIRST ORDER •".

- [ ] **Step 3.2: Redesign `Header.jsx`**
  - Align with dark header styling in reference: bold uppercase logo "ALFAREL.ID", centered nav items (CATALOG, COLLECTIONS, STORIES, DROPS), search & cart triggers, and bright yellow/lime "ORDER NOW →" CTA pill.

---

### Task 4: Giant Condensed Hero & About Section Components
**Files:**
- Create: `src/components/EditorialHero.jsx`
- Create: `src/components/AboutSection.jsx`

**Interfaces:**
- Consumes: `editorialAssets.heroModel`, `editorialAssets.aboutModel`.
- Produces: Hero section with massive background "ALFAREL" lettering, centered model, review badge, and About AlfaREL editorial card.

- [ ] **Step 4.1: Build `EditorialHero.jsx`**
  - Implement giant background typography "ALFAREL" with opacity overlay.
  - Centered high-fashion model image cutout/portrait.
  - Left copy: "Wear The Vacation Feeling — Effortless coastal streetwear designed for everyday confidence and relaxed beach living."
  - Right social badge: Avatar stack + "3.5K+ SATISFIED SHOPPERS • 4.9/5 REVIEWS".
  - Sub-labels: "COASTAL FASHION", "@2026 BRAND".

- [ ] **Step 4.2: Build `AboutSection.jsx`**
  - Off-white / Sand linen canvas.
  - Huge condensed heading: "ABOUT ALFAREL".
  - Center photography card with model portrait.
  - Left bullet tag: "• Limited drops no - restocks no apologies. • @2026 Best Collection".
  - Right editorial manifesto: "Capturing the way you need it. Discover fashion designed for everyday confidence—modern fits, premium fabrics, and timeless pieces made to move with your lifestyle."

---

### Task 5: Top Collection & Featured Products Carousel Components
**Files:**
- Create: `src/components/TopCollectionSection.jsx`
- Create: `src/components/FeaturedProductsSection.jsx`

**Interfaces:**
- Consumes: `products` list, `onAddToCart`, `onSelectProduct`.
- Produces: Top collections editorial cards `[001]` / `[002]` and horizontal sliding featured products carousel in vibrant terracotta container.

- [ ] **Step 5.1: Build `TopCollectionSection.jsx`**
  - Large condensed heading: "OUR TOP COLLECTION".
  - Numbered card `[001]` with model in resort fedora, text: "FROM TIMELESS CLASSICS TO BOLD, TRENDSETTING PIECES, EVERY OUTFIT TELLS A STORY", counter "02".
  - Numbered card `[002]` with close-up model in sunglasses.
  - Right heading: "Seasonal Elevating Essentials Product" with circular arrow button.

- [ ] **Step 5.2: Build `FeaturedProductsSection.jsx`**
  - Vibrant terracotta/sunset background (`#EE592B`).
  - Giant heading: "FEATURED PRODUCT".
  - White product cards with:
    - Product photo with diagonal arrow `↗`
    - Product title
    - Brand / Category label
    - Price in IDR and strikethrough discount
    - Quick "Beli Sekarang / Detail" action
  - Circular slider navigation buttons `<` and `>` with horizontal scrolling logic.

---

### Task 6: Editorial Mood Gallery & Interactive Curated Collections List
**Files:**
- Create: `src/components/EditorialMoodGallery.jsx`
- Create: `src/components/CuratedBrandsSection.jsx`

**Interfaces:**
- Consumes: `editorialAssets`, `categories`.
- Produces: Twilight dark photo gallery with ghost text and interactive hover-preview category rows.

- [ ] **Step 6.1: Build `EditorialMoodGallery.jsx`**
  - Deep midnight ocean slate background (`#0C131A`).
  - Giant background ghost typography: "OUR FEATURED COASTAL PRODUCT".
  - Asymmetric floating cards with fashion model photography and "FEATURED //" tag.

- [ ] **Step 6.2: Build `CuratedBrandsSection.jsx`**
  - Large heading: "OUR BEST CURATIONS".
  - Interactive rows with numbers and diagonal arrows:
    - `01. Resort Linen Shirts ↗`
    - `02. Chill Boardshorts ↗`
    - `03. Oversized Beach Tees ↗`
    - `04. Coastal Kimono Outer ↗`
    - `05. Sunset Accessories ↗`
  - Floating image preview card that shifts smoothly on mouse hover over each row.

---

### Task 7: Spotlight Product Configurator & Next Drop Banner
**Files:**
- Create: `src/components/ProductSpotlightSection.jsx`
- Create: `src/components/NextDropBanner.jsx`

**Interfaces:**
- Consumes: flagship product data, `onAddToCart`.
- Produces: Interactive spotlight card with live color swatch picking and next drop callout banner.

- [ ] **Step 7.1: Build `ProductSpotlightSection.jsx`**
  - Faint background ghost text "COLLECTIONS".
  - Headline: "TOP RESORT SLEEVE SHIRT", stars: "★★★★★ PROPER REVIEWS [4.9]".
  - Center model sitting on stool.
  - Price: Rp 289.000 (discount from Rp 349.000).
  - Material caption: "100% ORGANIC COTTON & LINEN".
  - Color swatches (Sand, Slate Navy, Coral) that dynamically update selection.
  - Pill button "ORDER NOW →" that immediately adds product with chosen color to cart.

- [ ] **Step 7.2: Build `NextDropBanner.jsx`**
  - Dynamic motion sunset banner with model in sunglasses.
  - Massive bold white text: "READY FOR THE NEXT DROP?".
  - CTA button: "VIEW ALL RESORT DROPS →" that scrolls smoothly to catalog.

---

### Task 8: Philosophy Quote, Editorial Duo Gallery & Footer
**Files:**
- Create: `src/components/PhilosophyFooterSection.jsx`

**Interfaces:**
- Consumes: social links, store contact information.
- Produces: Dark espresso/twilight manifesto section, B&W dual portraits, and complete footer.

- [ ] **Step 8.1: Build `PhilosophyFooterSection.jsx`**
  - Large amber statement: "At AlfaREL.ID, fashion is more than what you wear—it's a reflection of your personality and confidence" with circular arrow button.
  - B&W photo duo with quotes:
    - "MORE IMPORTANTLY, THEY LISTENED TO MY PERSONALITY AND WHAT I WANTED TO PROJECT"
    - "THE QUALITY OF THE FABRICS IS TOP-NOTCH"
  - Footer bar with quick links, WhatsApp customer service contact, and copyright notice.

---

### Task 9: Assemble All Components in `App.jsx` & Final Verification
**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Coordinates all 11 sections with cart drawer, checkout modal, search bar, and admin panel.

- [ ] **Step 9.1: Assemble all sections in `App.jsx` in the exact reference order**
  - Header -> Hero -> Ticker -> About -> Top Collection -> Featured Products -> Mood Gallery -> Curated Brands -> Spotlight Configurator -> Next Drop Banner -> Philosophy & Footer.
- [ ] **Step 9.2: Verify responsive layout on mobile (375px) and desktop (1280px)**
- [ ] **Step 9.3: Run `npm run build` to verify zero build errors**
- [ ] **Step 9.4: Conduct end-to-end user experience check via browser**
