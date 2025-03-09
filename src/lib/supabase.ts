
import { createClient } from '@supabase/supabase-js';

// Try to use environment variables, or fallback to hardcoded values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://prqmjghzshtbtryzujlr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBycW1qZ2h6c2h0YnRyeXp1amxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MTE5NDYsImV4cCI6MjA1NzA4Nzk0Nn0.2f407lBaThNyNRggUVMt-lF9M40tTBqA6XnUG2pd95E';

// Only throw an error in production, allow development to proceed with warning
if ((!supabaseUrl || !supabaseAnonKey) && import.meta.env.PROD) {
  throw new Error('Missing Supabase environment variables');
} else if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Missing Supabase environment variables. Authentication and database features will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
