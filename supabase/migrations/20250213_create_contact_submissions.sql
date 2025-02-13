-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('contact', 'audit')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'failed')),
    email_sent BOOLEAN DEFAULT false,
    email_sent_at TIMESTAMPTZ,
    error_message TEXT
);

-- Create index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated users and anon
CREATE POLICY "Enable insert for all users" ON public.contact_submissions
    FOR INSERT WITH CHECK (true);

-- Create policy to allow select only for authenticated users
CREATE POLICY "Enable select for authenticated users only" ON public.contact_submissions
    FOR SELECT USING (auth.role() = 'authenticated'); 