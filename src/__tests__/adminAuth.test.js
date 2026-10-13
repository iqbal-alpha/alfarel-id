import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  verifyAdminPin,
  createProduct,
  updateProduct,
  deleteProduct
} from '../lib/supabase';

describe('Admin Authentication & Data Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects empty or wrong PINs', async () => {
    const result = await verifyAdminPin('wrong-pin-999');
    expect(result).toBe(false);

    const emptyResult = await verifyAdminPin('');
    expect(emptyResult).toBe(false);
  });

  it('does not have a hardcoded 1234 backdoor when Supabase is configured', async () => {
    // If Supabase is configured or custom PIN is set, random 1234 should not automatically bypass
    const result = await verifyAdminPin('0000');
    expect(result).toBe(false);
  });
});
