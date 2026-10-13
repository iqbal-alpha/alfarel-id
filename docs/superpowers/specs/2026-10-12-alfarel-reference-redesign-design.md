# Design Document: AlfaREL.ID Front-End Redesign (Referensi.webp Layout Translation)

* **Date:** 2026-10-12
* **Project:** AlfaREL.ID Store
* **Status:** Proposed
* **Design Read:** Editorial high-fashion coastal streetwear e-catalog translated 1:1 from `referensi.webp` architecture, infusing Breezy Daylight Sand & Ocean tones, tailored AI model photography, and frictionless WhatsApp fast checkout.

---

## 1. Intent & Why

The user requested a complete overhaul of the front-end design to mirror the exact structure, visual cadence, and interactive components seen in `referensi.webp`, while adapting the brand identity and mood to **AlfaREL.ID Store** (*"Wear The Vacation Feeling — Effortless Coastal & Resort Apparel"*) with a **Breezy Daylight Sand & Ocean** chill beach aesthetic (Option B).

---

## 2. Goals, Non-Goals, and Anti-Goals

### 2.1 Goals
1. **1:1 Structural Fidelity to `referensi.webp`**:
   - Sticky Editorial Header with brand logo, nav links, and high-visibility Order Now CTA.
   - Giant Condensed Hero with massive "ALFAREL" typography, hero model, narrative copy, and 3.5K+ customer satisfaction badge.
   - Animated Ticker Marquee with citrus/lime beach streetwear accents.
   - Editorial "About AlfaREL" with center photography card, drop manifesto, and typography details.
   - "Our Top Collection" with numbered cards `[001]`, `[002]` and seasonal elevating essentials headline.
   - "Featured Product" carousel/grid in punchy sunset terracotta container (`#EE592B`), clean white cards, diagonal arrow links, and slider navigation.
   - Dark Twilight Mood Gallery with ghost typography "OUR FEATURED COASTAL APPAREL" and staggered floating photography cards.
   - "Our Best Curations / Brands" interactive list with interactive hover preview displaying floating images.
   - Spotlight Product Configurator featuring live color swatches, rating, price, and instant order CTA.
   - "Ready for the Next Drop?" high-energy sunset motion banner.
   - Philosophy Quote, B&W editorial photography duo with quote cards, and footer copyright bar.
2. **AI Model Assets Generation**: Generate bespoke, editorial coastal streetwear photography assets via `generate_image` tool rather than generic placeholders.
3. **E-Commerce Integration**: Maintain 100% functionality of CartDrawer, WhatsApp Fast Checkout, Instant Search, Category Filter, Product Detail Modal, and Admin Panel.
4. **Responsive Performance**: Fluid layout across 320px mobile up to 1440px desktop.

### 2.2 Non-Goals
- Changing backend infrastructure or replacing the React 18 + Vite stack.
- Modifying checkout logic (WhatsApp order generator remains intact).

### 2.3 Anti-Goals (Taste Skill & Anti-Slop)
- No generic AI-purple/cyan gradients or generic templates.
- No blurry stock photos or placeholder boxes.
- No uniform boring 3-card grids that ignore the editorial asymmetrical rhythm of the reference.
- No loss of catalog searchability or fast checkout speed.

---

## 3. Visual System & Design Tokens (Option B: Breezy Daylight Sand & Ocean)

```css
:root {
  /* Surfaces & Canvases */
  --bg-sand: #F7F4EC;             /* Warm Sunlit Sand Linen */
  --bg-card: #FFFFFF;             /* Pure Card Surface */
  --bg-card-subtle: #EFE9DC;      /* Subtle Sand Accent */
  --bg-twilight: #0C131A;         /* Deep Ocean Midnight (Dark Sections) */
  --bg-sunset: #EE592B;           /* Vibrant Sunset Terracotta */
  --bg-ticker: #E3F934;           /* Citrus Sun Yellow Ticker */

  /* Text & Accents */
  --text-dark: #0F172A;           /* Deep Marine Ink */
  --text-muted: #64748B;          /* Soft Weathered Slate */
  --text-light: #F8FAFC;          /* Clean Light Text */
  --color-teal: #134E5E;          /* Deep Coastal Teal */
  --color-seafoam: #5CB5A6;       /* Tropical Seafoam */
  --color-coral: #FF6B57;         /* Sunset Coral Accent */

  /* Typography */
  --font-display: 'Outfit', 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
}
```

---

## 4. Component Architecture & Section Breakdown

1. **`Header.jsx`**:
   - Brand: "ALFAREL.ID" in ultra-bold tracked typography.
   - Links: Catalog, New Drops, Curations, About.
   - Actions: Language switch (ID/EN), Admin lock toggle, Search trigger, Cart icon badge, and neon "ORDER NOW →" button.
2. **`EditorialHero.jsx`**:
   - Huge condensed background lettering: "ALFAREL".
   - Foreground: Centered coastal lifestyle model photo wearing resort streetwear.
   - Subtext & Social Proof: "3.5K+ CHILL SHOPPERS • 4.9/5 REVIEWS".
3. **`MarqueeTicker.jsx`**:
   - Infinite smooth CSS animation ticker with citrus sun yellow background: "COASTAL STREETWEAR • RESORT APPAREL • BREEZY LINEN • FAST WHATSAPP CHECKOUT • 100% ORGANIC COTTON •".
4. **`AboutSection.jsx`**:
   - Sand linen backdrop, "ABOUT ALFAREL", center portrait card with editorial model, drop notes (`• Limited drops no restocks`, `• @2026 Best Collection`).
5. **`TopCollectionSection.jsx`**:
   - Numbered editorial cards `[001]` and `[002]` with photo cards, progress counter, and "Seasonal Elevating Essentials Product" heading with circular arrow button.
6. **`FeaturedProductsSection.jsx`**:
   - Sunset Terracotta container (`#EE592B`).
   - Cards on white background: product photo with diagonal arrow `↗`, product name, category/brand, price in IDR, quick "Add to Cart" or detail modal trigger.
   - Carousel navigation arrows `<` and `>`.
7. **`EditorialMoodGallery.jsx`**:
   - Deep midnight ocean canvas (`#0C131A`), giant ghost text "OUR FEATURED COASTAL APPAREL".
   - Asymmetric floating cards with sunlit beach streetwear model photos and "FEATURED //" badge.
8. **`CuratedBrandsSection.jsx`**:
   - Interactive list:
     - `01. Resort Linen Shirts ↗`
     - `02. Chill Boardshorts ↗`
     - `03. Oversized Beach Tees ↗`
     - `04. Coastal Kimono Outer ↗`
     - `05. Sunset Accessories ↗`
   - Interactive hover state that reveals floating image preview card.
9. **`ProductSpotlightSection.jsx`**:
   - Dedicated spotlight on flagship product (e.g., Resort Linen Cuban Shirt).
   - Rating stars `★★★★★ PROPER REVIEWS[4.9]`.
   - Giant faint background letters "COLLECTIONS".
   - Center model photography, live color swatches (Natural Sand, Ocean Slate, Sunset Coral), price, and direct "ORDER NOW →" button.
10. **`NextDropBanner.jsx`**:
    - High-energy banner: "READY FOR THE NEXT DROP?".
    - Model portrait with sunglasses, glowing gradient, CTA "VIEW COLLECTION →".
11. **`PhilosophyFooterSection.jsx`**:
    - Deep midnight slate background.
    - Large amber/coral statement: "At AlfaREL.ID, fashion is more than what you wear—it's a reflection of your personality and confidence".
    - Dual B&W / high-contrast editorial photography cards with customer quotes.
    - Full footer links & copyright bar.

---

## 5. Image Assets Plan (via `generate_image`)
1. `hero_model_coastal`: Streetwear model wearing breezy red/terracotta knit beanie and resort apparel, high-fashion lighting.
2. `about_editorial_model`: Editorial coastal model in relaxed hoodie/shirt, artistic cinematic lighting.
3. `top_collection_001`: Model in resort fedora/sunhat with red/warm studio lighting.
4. `top_collection_002`: Close-up fashion portrait with chic retro sunglasses.
5. `mood_gallery_1`: Model looking upward with sunglasses and sunset orange tones.
6. `mood_gallery_2`: Model in sun-drenched beach breeze portrait.
7. `spotlight_model`: Relaxed model sitting casually in linen shirt and denim/shorts.
8. `next_drop_banner_model`: High-fashion model with visor sunglasses in dynamic motion light.
9. `editorial_bw_1` & `editorial_bw_2`: High-contrast black & white fashion editorial portraits for footer manifesto.

---

## 6. What's Left to the Builder
- Image asset file saving paths (`public/images/*`).
- Smooth scrolling anchors and modal trigger hooks.
- Micro-interaction animation timings and CSS keyframes for marquee and hover previews.
