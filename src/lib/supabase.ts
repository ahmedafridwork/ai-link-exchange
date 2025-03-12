
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

console.log("Supabase client initialized with URL:", supabaseUrl);

// Important information about Supabase configuration needed for the app to work:
/*
1. Create an 'ai_links' table in Supabase with the following schema:
   - id (bigint, auto-increment, primary key)
   - created_at (timestamp with time zone, default: now())
   - title (text, nullable)
   - description (text, nullable)
   - url (text, nullable)
   - tags (text, nullable)
   - image (text, nullable)
   - user_id (uuid, nullable, references auth.users.id)

2. Set up Row Level Security (RLS) policies for the ai_links table:
   - Enable RLS for the table
   - Add a policy for SELECT: Allow users to read all records
     - Using expression: true
     - For operation: SELECT
   - Add a policy for INSERT/UPDATE: Allow authenticated users to insert their own records
     - Using expression: (auth.uid() = user_id)
     - For operations: INSERT, UPDATE
   - Add a policy for DELETE: Allow users to delete their own records
     - Using expression: (auth.uid() = user_id)
     - For operation: DELETE

3. If you're having issues with signup or data insertion, check:
   - Email confirmations are disabled in Authentication > Settings
   - RLS policies are correctly set up as described above
   - The foreign key constraint is properly configured
*/
