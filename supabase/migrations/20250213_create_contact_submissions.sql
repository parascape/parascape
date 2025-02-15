-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Drop existing table (this will cascade and remove policies)
DROP TABLE IF EXISTS public.contact_submissions CASCADE;

-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
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

-- Create the email handling function
CREATE OR REPLACE FUNCTION handle_contact_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  response_status INT;
  response_body JSONB;
  edge_function_url TEXT;
BEGIN
    -- Log the start of function execution
    RAISE NOTICE 'Processing new submission: %', NEW.id;

    -- Set the Edge Function URL
    edge_function_url := 'https://hpuqzerpfylevdfwembv.supabase.co/functions/v1/handle-contact-email';

    -- Make the HTTP request to the Edge Function
    SELECT
        status, content::jsonb INTO response_status, response_body
    FROM
        net.http_post(
            url := edge_function_url,
            headers := jsonb_build_object(
                'Content-Type', 'application/json',
                'Authorization', format('Bearer %s', current_setting('app.settings.service_role_key', true))
            ),
            body := jsonb_build_object('record', row_to_json(NEW))
        );

    -- Update the submission status based on the response
    UPDATE contact_submissions
    SET
        status = CASE 
            WHEN response_status = 200 THEN 'processed'
            ELSE 'failed'
        END,
        email_sent = response_status = 200,
        email_sent_at = CASE 
            WHEN response_status = 200 THEN NOW()
            ELSE NULL
        END,
        error_message = CASE 
            WHEN response_status != 200 THEN COALESCE(response_body->>'error', 'Failed to send email')
            ELSE NULL
        END
    WHERE id = NEW.id;

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Update the submission with the error
        UPDATE contact_submissions
        SET
            status = 'failed',
            error_message = format('Trigger error: %s', SQLERRM)
        WHERE id = NEW.id;
        
        RETURN NEW;
END;
$$;

-- Drop any existing triggers
DROP TRIGGER IF EXISTS on_new_submission ON contact_submissions;
DROP TRIGGER IF EXISTS trigger_handle_contact_email ON contact_submissions;
DROP TRIGGER IF EXISTS handle_contact_email_trigger ON contact_submissions;

-- Create the trigger
CREATE TRIGGER handle_contact_email_trigger
    AFTER INSERT ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION handle_contact_email();

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for anon" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable insert for authenticated" ON public.contact_submissions;
DROP POLICY IF EXISTS "Enable select for service role" ON public.contact_submissions;

-- Create more explicit policies
CREATE POLICY "Enable insert for anon" ON public.contact_submissions
    FOR INSERT TO anon
    WITH CHECK (
        name IS NOT NULL AND
        email IS NOT NULL AND
        phone IS NOT NULL AND
        message IS NOT NULL AND
        type IN ('contact', 'audit')
    );

CREATE POLICY "Enable insert for authenticated" ON public.contact_submissions
    FOR INSERT TO authenticated
    WITH CHECK (
        name IS NOT NULL AND
        email IS NOT NULL AND
        phone IS NOT NULL AND
        message IS NOT NULL AND
        type IN ('contact', 'audit')
    );

CREATE POLICY "Enable select for service role" ON public.contact_submissions
    FOR ALL TO service_role
    USING (true);

-- Ensure proper grants
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
GRANT INSERT ON public.contact_submissions TO anon, authenticated;

-- Ensure trigger function has correct permissions
REVOKE EXECUTE ON FUNCTION handle_contact_email() FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION handle_contact_email() TO postgres; 