
import { createClient } from '@supabase/supabase-js';

// Try to use environment variables, or fallback to empty strings for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only throw an error in production, allow development to proceed with warning
if ((!supabaseUrl || !supabaseAnonKey) && import.meta.env.PROD) {
  throw new Error('Missing Supabase environment variables');
} else if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Missing Supabase environment variables. Authentication and database features will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
