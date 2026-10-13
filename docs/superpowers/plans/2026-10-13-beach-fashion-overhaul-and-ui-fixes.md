# Beach Resort Fashion Overhaul & UI Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform AlfaREL.ID into an authentic sun-drenched beach & coastal resort fashion store: regenerate all imagery to genuine beachwear, eliminate text overlap in the Hero section, enforce pure English throughout the entire app (removing Indonesian), and relocate the floating curation photo into a dedicated non-obstructive showcase column.

**Architecture:** 
- Image asset generation using `generate_image` producing genuine coastal beachwear photography (linen shirts, beach trunks, woven raffia, ocean & golden sand backdrops) for both editorial placements and catalog products.
- Modular React 18 component refinements for `EditorialHero.jsx` (spacious grid/stacking with zero overlap) and `CuratedBrandsSection.jsx` (2-column editorial layout: interactive list on left, elegant card showcase on right).
- Complete cleanup of internationalization to pure English: remove language toggles, deprecate Indonesian fallbacks, and standardize all UI copy, modals, and WhatsApp checkout text to English.

**Tech Stack:** React 18, Vite, Lucide-React, Vanilla CSS Design Tokens, `generate_image`.

**Spec:** Direct user requirements from session review:
1. Regenerate ALL photography to authentic beach/coastal fashion products (resort wear, linen, swim shorts, ocean/sand background).
2. Fix Hero section image overlapping text.
3. Switch entire app to English only (take out Indonesian).
4. Relocate the photo in "OUR BEST CURATIONS" away from the middle of the text lines.

## Global Constraints
- Pure English copy across all views, buttons, drawer, modals, and WhatsApp messages.
- Zero text occlusion or awkward negative margins.
- All photography must authentically represent beach & coastal resort fashion (no heavy winter beanies, no thick sweatshirts, no corporate suits).
- Zero broken e-commerce functionality: CartDrawer, WhatsApp checkout, product modal, and filters must remain 100% functional.
- Clean responsive behavior on mobile (360px–430px) and desktop (1024px+).

## Review Focus
1. Hero section typography ("ALFAREL", narrative blurb, customer badge) must remain completely legible and never overlap the model photo across all viewport sizes.
2. Curated collections preview image must sit beside or inside a dedicated preview slot, never covering curation names.
3. Language toggle in Header must be removed, and no Indonesian strings should appear in catalog cards, filters, modals, or WhatsApp text.
4. All 10 editorial images and mock products must display authentic beachwear and coastal backdrops.
5. Production build (`npm run build`) must pass cleanly with zero warnings or errors.

---

### Task 1: Generate Authentic Beach Resort Fashion Photography & Update Assets
**Files:**
- Create: `public/images/editorial/*` (regenerate 10 images)
- Modify: `src/data/editorialAssets.js`
- Modify: `src/data/mockProducts.js`

**Interfaces:**
- Produces: `editorialAssets` with authentic coastal beachwear images (open linen camp shirts, beach shorts, ocean/sand/sunlight settings).
- Updates: `initialProducts` with verified beach/resort fashion imagery (linen shirts, boardshorts, straw hats, beach sunglasses).

- [ ] **Step 1.1: Generate Editorial Hero Model**
  - Prompt: "Editorial high-fashion male model wearing relaxed open camp-collar breezy white linen resort shirt and tortoise sunglasses, standing on pristine sandy beach with turquoise ocean waves and warm golden hour sunlight, luxury coastal vacation aesthetic."
  - Save as `public/images/editorial/hero-model.jpg`.

- [ ] **Step 1.2: Generate About & Top Collections Images**
  - About: "Chic fashion model in breezy relaxed sage green linen shirt and woven straw fedora standing on sunlit coastal resort boardwalk overlooking calm ocean." -> `about-model.jpg`.
  - Collection 001: "High-fashion model wearing loose sand-beige resort linen trousers and open shirt walking barefoot on tropical beach during golden sunset." -> `collection-001.jpg`.
  - Collection 002: "Close-up sun-kissed fashion portrait wearing chic retro beach sunglasses, salt-water breeze hair, ocean bokeh backdrop." -> `collection-002.jpg`.

- [ ] **Step 1.3: Generate Mood Gallery & Spotlight Images**
  - Mood 01: "Sun-drenched beach editorial portrait of stylish model in relaxed ocean-blue resort shirt laughing by the breaking waves." -> `mood-01.jpg`.
  - Mood 02: "Candid coastal luxury resort scene, model wearing chic linen beachwear relaxing under palm tree shadows with ocean in background." -> `mood-02.jpg`.
  - Spotlight: "Fashion model sitting casually on a teak beach lounge chair under tropical umbrella, wearing signature resort camp-collar linen shirt in soft terracotta." -> `spotlight-model.jpg`.

- [ ] **Step 1.4: Generate Drop Banner & B&W Manifesto Images**
  - Drop Banner: "Dynamic cinematic wide photo of model in billowing resort vacation apparel walking along golden sunset coastline with crashing surf." -> `drop-banner.jpg`.
  - B&W Quote 1: "High-contrast black and white editorial portrait of fashion model in open linen shirt on coastal sand dunes, wind in hair." -> `bw-quote-1.jpg`.
  - B&W Quote 2: "Black and white editorial fashion portrait of smiling beach resort model wearing linen apparel against ocean horizon." -> `bw-quote-2.jpg`.

- [ ] **Step 1.5: Update `mockProducts.js` with Authentic Beachwear Photos**
  - Audit and replace all 10 product images with verified beachwear images (linen shirts, swim boardshorts, oversized beach tees, woven raffia hat, polarized beach sunglasses).

---

### Task 2: Fix Hero Section Layout & Overlapping Text
**Files:**
- Modify: `src/components/EditorialHero.jsx`

**Interfaces:**
- Consumes: `editorialAssets.heroModel`, `editorialAssets.collection001`, `editorialAssets.collection002`.
- Produces: Clean, breathable layout where the giant typography, model portrait, narrative blurb, and customer review badge sit in harmonious balance with zero negative margin collision.

- [ ] **Step 2.1: Restructure Layout & Remove Collision Margins**
  - Remove destructive `marginTop: '-3rem'` on bottom content row.
  - Ensure the giant "ALFAREL" condensed background typography is scaled cleanly and layered so it frames the model without being obstructed or obstructing copy.
  - Position the left copy blurb and right social proof badge in a dedicated responsive row with clear spacing.
  - Add responsive CSS ensuring mobile devices stack cleanly: Brand tag -> Headline -> Model -> Copy & Badge.

---

### Task 3: Enforce Pure English & Remove Indonesian Language Elements
**Files:**
- Modify: `src/components/Header.jsx`
- Modify: `src/i18n/LanguageContext.jsx`
- Modify: `src/data/mockProducts.js`
- Modify: `src/App.jsx`
- Modify: `src/components/SearchBar.jsx`
- Modify: `src/components/CategoryFilter.jsx`
- Modify: `src/components/ProductCard.jsx`
- Modify: `src/components/ProductDetailModal.jsx`
- Modify: `src/components/CartDrawer.jsx`
- Modify: `src/components/CheckoutModal.jsx`
- Modify: `src/components/AdminPanel.jsx`
- Modify: `src/components/FeaturedProductsSection.jsx`
- Modify: `src/components/ProductSpotlightSection.jsx`
- Modify: `src/components/NextDropBanner.jsx`
- Modify: `src/components/PhilosophyFooterSection.jsx`

**Interfaces:**
- Produces: 100% English interface with all labels, buttons, currency hints, placeholders, and WhatsApp order generator formatted in clean international English.

- [ ] **Step 3.1: Remove Language Switcher from `Header.jsx`**
  - Delete language toggle pill button (ID/EN) and keep clean navigation links + Order Now CTA.

- [ ] **Step 3.2: Set Fixed English in `LanguageContext.jsx` and Clean Components**
  - Lock language to `'en'` and update all components to use English copy directly.
  - Update WhatsApp message generation in `CartDrawer.jsx` and `CheckoutModal.jsx` to English ("Hello AlfaREL.ID, I would like to order...").

---

### Task 4: Fix "OUR BEST CURATIONS" Image Position
**Files:**
- Modify: `src/components/CuratedBrandsSection.jsx`

**Interfaces:**
- Consumes: `editorialAssets`, `curations` list, `onSelectCategory`.
- Produces: Asymmetric 2-column layout:
  - Left column (60%): Clean numbered curation rows with ample breathing room and smooth hover indicators.
  - Right column (40%): Dedicated stylish preview showcase card that displays the active item's image and quick category trigger, never overlapping the text.

- [ ] **Step 4.1: Convert CuratedBrandsSection to 2-Column Desktop Grid**
  - Remove centered absolute positioning (`left: '52%'`, `zIndex: 10`).
  - Create a 2-column responsive layout (`grid-template-columns: 1fr 380px` on desktop, single column on mobile).
  - Left: Interactive curation rows (`01. Resort Linen Shirts`, `02. Sunset Boardshorts`, etc.).
  - Right: Floating/sticky showcase card displaying the active curation's image with subtle rotation and smooth transition.
  - Mobile: Clean list layout without awkward overlapping floating elements.

---

### Task 5: Build Verification & Final Sanity Check
**Files:**
- Verification: `npm run build`
- Dev server check: `http://localhost:3000/`

- [ ] **Step 5.1: Run `npm run build` to verify zero errors**
- [ ] **Step 5.2: Verify layout visually on desktop and mobile**
- [ ] **Step 5.3: Confirm all 4 user requirements are completely met**
