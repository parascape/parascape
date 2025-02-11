-- First, drop the existing table and its policies if they exist
DROP TABLE IF EXISTS public.contacts CASCADE;

-- Create the contacts table
CREATE TABLE public.contacts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamptz DEFAULT now(),
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    message text NOT NULL,
    type text DEFAULT 'contact' CHECK (type IN ('contact', 'audit')),
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
    notes text
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS contacts_email_idx ON public.contacts (email);
CREATE INDEX IF NOT EXISTS contacts_type_idx ON public.contacts (type);
CREATE INDEX IF NOT EXISTS contacts_status_idx ON public.contacts (status);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (just in case)
DROP POLICY IF EXISTS "Allow inserts from anyone" ON public.contacts;
DROP POLICY IF EXISTS "Allow select for authenticated users only" ON public.contacts;
DROP POLICY IF EXISTS "Allow updates for authenticated users only" ON public.contacts;

-- Create a completely permissive insert policy for the contact form
-- This allows anyone to submit the contact form
CREATE POLICY "Allow inserts from anyone" ON public.contacts
    FOR INSERT TO public
    WITH CHECK (true);

-- Only allow authenticated users to view submissions
CREATE POLICY "Allow select for authenticated users only" ON public.contacts
    FOR SELECT TO authenticated
    USING (true);

-- Only allow authenticated users to update submissions
CREATE POLICY "Allow updates for authenticated users only" ON public.contacts
    FOR UPDATE TO authenticated
    USING (true)
    WITH CHECK (true);

-- Grant necessary permissions
GRANT ALL ON public.contacts TO authenticated;
GRANT INSERT ON public.contacts TO anon;
GRANT USAGE ON SEQUENCE contacts_id_seq TO anon;

-- Test insert (optional, comment out in production)
-- INSERT INTO public.contacts (name, email, phone, message, type)
-- VALUES ('Test User', 'test@example.com', '1234567890', 'This is a test message', 'contact')
-- RETURNING *; 