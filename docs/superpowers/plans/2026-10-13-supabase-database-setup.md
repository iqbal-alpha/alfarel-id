# Supabase Database Setup (Tahap 3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create full production-ready PostgreSQL DDL migrations, RLS policies, storage bucket configurations, and seed scripts for Supabase, alongside client SDK configuration for AlfaREL.ID Store.

**Architecture:** PostgreSQL schema on Supabase with Row Level Security (RLS) for public read & admin mutation, Supabase Storage bucket for product images, and `@supabase/supabase-js` client wrapper with graceful fallback to mock data when offline.

**Tech Stack:** Supabase (PostgreSQL 15+, RLS, Supabase Storage, JS Client v2).

**Spec:** [PRD.md](file:///c:/Users/ASUS/Documents/Antigravity/Apparel/PRD.md#L234-L350)

---

### Task 1: Create Supabase DDL Migration Script
**Files:**
- Create: `supabase/migrations/20261013_initial_schema.sql`

**Steps:**
- [ ] Create `categories`, `products`, `store_settings`, and `order_logs` tables.
- [ ] Add foreign key constraints, indexes, and automatic `updated_at` triggers.
- [ ] Configure Row Level Security (RLS) policies allowing public read and authenticated/service-role write.
- [ ] Configure Supabase Storage bucket `product-images` policy (public read).

### Task 2: Create Initial Seed Data SQL
**Files:**
- Create: `supabase/seed.sql`

**Steps:**
- [ ] Insert 4 primary categories (`shirts`, `tees`, `shorts`, `accessories`).
- [ ] Insert initial store settings (WhatsApp recipient number `6281234567890`, announcement banner, store status).
- [ ] Insert all 12 curated beach apparel products with titles, descriptions, prices, image arrays, and available sizes matching `src/data/mockProducts.js`.

### Task 3: Create Supabase Client Module & Environment Configuration
**Files:**
- Create: `.env.example`
- Create: `src/lib/supabase.js`
- Modify: `package.json` (install `@supabase/supabase-js`)

**Steps:**
- [ ] Install `@supabase/supabase-js`.
- [ ] Create `src/lib/supabase.js` with client instantiation and helper functions.
- [ ] Add fallback mechanism: if `VITE_SUPABASE_URL` is unset, gracefully return mock data so local dev never breaks.
- [ ] Create `.env.example` with clear instructions on finding credentials in Supabase Dashboard.

### Task 4: Verification and SQL Syntax Validation
**Files:**
- Test: Validate build and verify SQL script completeness.

**Steps:**
- [ ] Run `npm run build` to verify clean compilation.
- [ ] Provide clear, step-by-step instructions for the user to execute the SQL in Supabase SQL Editor.
