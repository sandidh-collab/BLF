import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (import.meta as any).env.VITE_SUPABASE_URL || 'https://tjaoktbbhvlhaoqzqtpx.supabase.co';
const SUPABASE_ANON_KEY = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqYW9rdGJiaHZsaGFvcXpxdHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNDc5OTUsImV4cCI6MjA5NDgyMzk5NX0.3tpedxu1dVh1qm_30HHnjObAXlqKraBUv7ybKo-AFZ4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Robust database helpers that sync data without breaking if tables do not exist yet.
 * This guarantees "no changes to existing UI/UX" but powers real persistent sync in the backend.
 */
export async function getSupabaseData<T>(tableName: string): Promise<T[] | null> {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.warn(`Supabase table "${tableName}" non-existent or error returned:`, error.message);
      return null;
    }
    return data as T[];
  } catch (err) {
    console.error(`Failed to fetch from table "${tableName}":`, err);
    return null;
  }
}

export async function insertSupabaseData<T>(tableName: string, row: any): Promise<T | null> {
  try {
    // Exclude react local ID if unnecessary or map as appropriate
    const cleanRow = { ...row };
    delete cleanRow.id; // Usually database auto-generates uuid or bigserial id

    const { data, error } = await supabase
      .from(tableName)
      .insert([cleanRow])
      .select();

    if (error) {
      console.warn(`Supabase insert failed for "${tableName}" (falling back locally):`, error.message);
      return null;
    }
    return data ? data[0] as T : null;
  } catch (err) {
    console.error(`Error inserting into Supabase table "${tableName}":`, err);
    return null;
  }
}

export async function updateSupabaseData(tableName: string, idVal: string | number, idField: string, updates: any): Promise<boolean> {
  try {
    const { error } = await supabase
      .from(tableName)
      .update(updates)
      .eq(idField, idVal);
    
    if (error) {
      console.warn(`Supabase update failed for "${tableName}":`, error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`Error updating Supabase table "${tableName}":`, err);
    return false;
  }
}
