-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow inserts from anyone" ON public.contacts;
DROP POLICY IF EXISTS "Allow select for authenticated users only" ON public.contacts;
DROP POLICY IF EXISTS "Allow updates for authenticated users only" ON public.contacts;

-- Make sure RLS is enabled
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create a completely permissive insert policy for the contact form
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

-- Verify the table has the correct structure
DO $$ 
BEGIN
    -- Add any missing columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'contacts' AND column_name = 'type') THEN
        ALTER TABLE public.contacts ADD COLUMN type text DEFAULT 'contact' 
            CHECK (type IN ('contact', 'audit'));
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'contacts' AND column_name = 'status') THEN
        ALTER TABLE public.contacts ADD COLUMN status text DEFAULT 'pending' 
            CHECK (status IN ('pending', 'contacted', 'completed'));
    END IF;
END $$; 