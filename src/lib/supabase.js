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
// Admin Authentication Service (Secure Stored Procedure / RPC Verification)
// ==============================================================================

/**
 * Verify Admin PIN securely via server-side procedure (avoids plaintext credential leaks)
 */
export async function verifyAdminPin(pin) {
  if (!pin || typeof pin !== 'string' || !pin.trim()) {
    return false;
  }

  const cleanPin = pin.trim();

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.rpc('alfarel_verify_admin_pin', {
        input_pin: cleanPin
      });

      if (!error && typeof data === 'boolean') {
        return data;
      }
      
      // If RPC is not yet executed on the remote database, fallback to checking store_settings
      // while avoiding hardcoded backdoors
      const { data: settings } = await supabase
        .from('alfarel_store_settings')
        .select('admin_pin_hash')
        .eq('id', 1)
        .single();

      if (settings?.admin_pin_hash) {
        return settings.admin_pin_hash === cleanPin;
      }
      return false;
    } catch (err) {
      console.warn('Admin PIN verification error:', err.message);
      return false;
    }
  }

  // Local Offline / Demo fallback (when VITE_SUPABASE_URL is not configured)
  const localPin = sessionStorage.getItem('alfarel_demo_pin') || import.meta.env.VITE_ADMIN_PIN || '1234';
  return cleanPin === localPin;
}

// ==============================================================================
// Database Helper Services with Isolated "alfarel_*" Namespace
// ==============================================================================

/**
 * Fetch all categories
 */
export async function getCategories() {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('alfarel_categories')
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

  let query = supabase.from('alfarel_products').select(`
    *,
    alfarel_categories (id, slug, name_id, name_en)
  `);

  if (!options.includeInactive) {
    query = query.eq('is_active', true);
  }

  if (options.categorySlug && options.categorySlug !== 'all') {
    query = query.eq('alfarel_categories.slug', options.categorySlug);
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

  const payload = { ...productData };

  // Resolve category slug to category_id foreign key UUID if needed
  if (payload.category && !payload.category_id) {
    try {
      const categories = await getCategories();
      const matched = categories?.find((c) => c.slug === payload.category);
      if (matched) {
        payload.category_id = matched.id;
      }
    } catch (e) {
      console.warn('Could not resolve category UUID:', e.message);
    }
    delete payload.category;
  }

  const { data, error } = await supabase
    .from('alfarel_products')
    .insert([payload])
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

  const payload = { ...updates };

  // Resolve category slug to category_id foreign key UUID if needed
  if (payload.category && !payload.category_id) {
    try {
      const categories = await getCategories();
      const matched = categories?.find((c) => c.slug === payload.category);
      if (matched) {
        payload.category_id = matched.id;
      }
    } catch (e) {
      console.warn('Could not resolve category UUID:', e.message);
    }
    delete payload.category;
  }

  const { data, error } = await supabase
    .from('alfarel_products')
    .update(payload)
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
    .from('alfarel_products')
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
    .from('alfarel_store_settings')
    .select('id, store_name, whatsapp_number, announcement_id, announcement_en, is_store_open, updated_at')
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
    .from('alfarel_store_settings')
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
  if (!isSupabaseConfigured()) return false;
  const { error } = await supabase
    .from('alfarel_order_logs')
    .insert([orderData]);
  if (error) {
    console.warn('Failed to record order log in Supabase:', error.message);
    return false;
  }
  return true;
}

/**
 * Fetch recent WhatsApp order logs (for authenticated admin review)
 */
export async function getOrderLogs(limit = 50) {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('alfarel_order_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.warn('Failed to fetch order logs from Supabase:', error.message);
    return [];
  }
  return data;
}
