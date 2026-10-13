import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-project.supabase.co');
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==============================================================================
// Database Helper Services with Graceful Offline / Fallback Support
// ==============================================================================

/**
 * Fetch all categories
 */
export async function getCategories() {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
}

/**
 * Fetch active products for public catalog
 */
export async function getProducts(options = {}) {
  if (!isSupabaseConfigured()) return null;

  let query = supabase.from('products').select(`
    *,
    categories (slug, name_id, name_en)
  `);

  if (!options.includeInactive) {
    query = query.eq('is_active', true);
  }

  if (options.categorySlug && options.categorySlug !== 'all') {
    query = query.eq('categories.slug', options.categorySlug);
  }

  query = query.order('sort_order', { ascending: true });

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/**
 * Create a new product (Admin)
 */
export async function createProduct(productData) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Update product data (Admin)
 */
export async function updateProduct(id, updates) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Delete product (Admin)
 */
export async function deleteProduct(id) {
  if (!isSupabaseConfigured()) return null;
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

/**
 * Fetch Store Settings
 */
export async function getStoreSettings() {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('store_settings')
    .select('*')
    .eq('id', 1)
    .single();
  if (error) throw error;
  return data;
}

/**
 * Update Store Settings (Admin)
 */
export async function updateStoreSettings(updates) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('store_settings')
    .update(updates)
    .eq('id', 1)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Record a WhatsApp order click for analytics
 */
export async function logOrder(orderData) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('order_logs')
    .insert([orderData])
    .select()
    .single();
  if (error) {
    console.warn('Failed to record order log in Supabase:', error.message);
    return null;
  }
  return data;
}
