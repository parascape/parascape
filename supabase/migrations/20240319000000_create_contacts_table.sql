-- Create contacts table
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

-- Set up RLS (Row Level Security)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated users and anon
CREATE POLICY "Allow inserts from anyone" ON public.contacts
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Create policy to allow select only for authenticated users
CREATE POLICY "Allow select for authenticated users only" ON public.contacts
    FOR SELECT
    TO authenticated
    USING (true);

-- Create policy to allow updates only for authenticated users
CREATE POLICY "Allow updates for authenticated users only" ON public.contacts
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create indexes
CREATE INDEX contacts_email_idx ON public.contacts (email);
CREATE INDEX contacts_type_idx ON public.contacts (type);
CREATE INDEX contacts_status_idx ON public.contacts (status); 