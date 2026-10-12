# Coastal Hero & Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the AlfaREL.ID Store front-end to match the user's reference layout (split hero with coastal lifestyle model, mobile quick-filter card, category bento showcase, and 3:4 portrait product grid with color swatches) adhering to `taste-skill` standards.

**Architecture:** 
- Desktop Split Hero: Left typography/CTA block + Right coastal lifestyle model image with warm atmospheric backplate.
- Mobile Hero: Stacked layout featuring the reference's quick search input + category dropdown box to give mobile users instant filtering capability.
- Category Bento Grid (`CategoryBentoGrid.jsx`): Visual category tiles with image accents, item counters, and instant filter click-through.
- Product Cards (`ProductCard.jsx`): Refactored to 3:4 portrait aspect ratio with category tag, dual price formatting, color swatch dots, and refined stock badges.

**Tech Stack:** React 18, Vite, Lucide-React icons, CSS Custom Properties (Design System tokens).

**Spec / Brief:** User reference images (Desktop Hero, Mobile Hero, Category Bento, Bestseller Grid) + PRD.md.

## Global Constraints
- Zero Emojis (Anti-Slop rule strictly enforced).
- Palette consistency: Warm Sand (`#F4EFE6`), Ocean Teal (`#1E6B7B`), Seafoam (`#62B6A8`), Coral Terracotta (`#E07A5F`), Deep Navy (`#0F172A`).
- Fully responsive from 320px mobile up to 1440px desktop.
- Retain existing WhatsApp checkout generator, CartDrawer, and AdminPanel functionality without breaking.

---

### Task 1: Lifestyle Model & Category Visual Assets
**Files:**
- Create: `src/data/categoryBentoData.js`
- Modify: `src/data/mockProducts.js`
**Steps:**
- [ ] Step 1.1: Curate high-quality, high-resolution lifestyle coastal apparel images for the hero model and category bento tiles.
- [ ] Step 1.2: Add hex color codes (`colorHexes`) to `mockProducts.js` items for color swatch rendering.
- [ ] Step 1.3: Define bento grid data structure with category IDs, titles, item counts, background gradient/color accents, and imagery.

---

### Task 2: Redesign HeroBanner Component (Split Desktop + Mobile Quick Search Card)
**Files:**
- Modify: `src/components/HeroBanner.jsx`
- Modify: `src/i18n/translations.js`
**Steps:**
- [ ] Step 2.1: Add translation strings for hero badge, quick mobile filter labels, and search button.
- [ ] Step 2.2: Implement 2-column split desktop layout (left: season badge, display headline, dual CTAs; right: lifestyle model with warm backdrop and soft badge overlay).
- [ ] Step 2.3: Implement mobile quick-filter card directly inside the hero (search input, category dropdown, submit button) as seen in reference image 2.
- [ ] Step 2.4: Test responsive breakpoint transition between mobile stack and desktop split layout.

---

### Task 3: Create CategoryBentoGrid Component
**Files:**
- Create: `src/components/CategoryBentoGrid.jsx`
- Modify: `src/App.jsx`
**Steps:**
- [ ] Step 3.1: Build `CategoryBentoGrid` component rendering visual tiles (Kemeja Pantai, Celana Pendek & Boardshorts, Kaos Oversize, Outer Kimono, Aksesoris Pantai).
- [ ] Step 3.2: Add hover lift, subtle scale effect, item count badges, and onSelectCategory callback.
- [ ] Step 3.3: Insert `CategoryBentoGrid` below HeroBanner in `App.jsx`.

---

### Task 4: Upgrade ProductCard Component (Portrait 3:4 & Color Swatches)
**Files:**
- Modify: `src/components/ProductCard.jsx`
**Steps:**
- [ ] Step 4.1: Update image container to 3:4 portrait ratio with subtle overflow containment and smooth image zoom on hover.
- [ ] Step 4.2: Render category label above title and price with strike-through original price comparison.
- [ ] Step 4.3: Add clickable/interactive color swatch circles beneath each card.
- [ ] Step 4.4: Ensure "Beli Cepat" / "Pilih Ukuran" CTA triggers modal/cart seamlessly.

---

### Task 5: App Integration, Verification & Build Check
**Files:**
- Modify: `src/App.jsx`
**Steps:**
- [ ] Step 5.1: Wire mobile quick search & category selection from hero directly to product catalog state.
- [ ] Step 5.2: Run `cmd /c "npm run build"` to verify zero syntax or compilation errors.
- [ ] Step 5.3: Verify responsiveness and visual cohesion on `http://localhost:3000/`.
- [ ] Step 5.4: Git commit changes.
