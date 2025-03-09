
# AI Link Exchange

A platform for sharing and discovering AI resources and tools.

## Supabase Setup Instructions

Follow these simple steps to set up Supabase for this project:

1. Create a `.env` file in the root directory of the project
2. Add the following environment variables to your `.env` file:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Replace `your_supabase_url` and `your_supabase_anon_key` with the values from your Supabase project:
   - Go to your Supabase dashboard: https://app.supabase.com/
   - Select your project
   - Go to Project Settings > API
   - Copy the "Project URL" and paste it as `VITE_SUPABASE_URL`
   - Copy the "anon public" key and paste it as `VITE_SUPABASE_ANON_KEY`

4. Restart your development server

## Database Setup

Make sure your Supabase database has a table called `ai_links` with the following structure:

- `id` (uuid, primary key)
- `title` (text, not null)
- `description` (text, not null)
- `url` (text, not null)
- `tags` (text array, not null)
- `image` (text, nullable)
- `user_id` (uuid, not null)
- `created_at` (timestamp with time zone, default: now())

You can create this table using the Supabase dashboard or SQL editor.
