-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create the contact submissions table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_submissions (
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
  service_role_key TEXT;
BEGIN
    -- Log the start of function execution
    RAISE NOTICE 'Processing new submission: %', NEW.id;

    -- Set the Edge Function URL and service role key
    edge_function_url := 'https://hpuqzerpfylevdfwembv.supabase.co/functions/v1/handle-contact-email';
    service_role_key := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTUxMjA4MiwiZXhwIjoyMDU1MDg4MDgyfQ.3U72os4aO9g7rc3Dg4ewMh198J-XZ8j4-iS-UKBkyDo';

    -- Log the key being used (masked for security)
    RAISE NOTICE 'Using service role key: %...%', LEFT(service_role_key, 4), RIGHT(service_role_key, 4);

    -- Make the HTTP request to the Edge Function
    SELECT
        status, content::jsonb INTO response_status, response_body
    FROM
        net.http_post(
            url := edge_function_url,
            headers := jsonb_build_object(
                'Content-Type', 'application/json',
                'Authorization', format('Bearer %s', service_role_key)
            ),
            body := jsonb_build_object(
                'record', jsonb_build_object(
                    'id', NEW.id,
                    'created_at', NEW.created_at,
                    'name', NEW.name,
                    'email', NEW.email,
                    'phone', NEW.phone,
                    'message', NEW.message,
                    'type', NEW.type,
                    'status', NEW.status
                )
            )
        );

    -- Log the response
    RAISE NOTICE 'Edge function response: status=%, body=%', response_status, response_body;

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
        -- Log any errors
        RAISE WARNING 'Error in handle_contact_email: %', SQLERRM;
        
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

-- Create the trigger
CREATE TRIGGER handle_contact_email_trigger
    AFTER INSERT ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION handle_contact_email();

-- Set up permissions
REVOKE ALL ON contact_submissions FROM anon, authenticated;
GRANT INSERT ON contact_submissions TO anon, authenticated;
GRANT SELECT ON contact_submissions TO authenticated;
REVOKE EXECUTE ON FUNCTION handle_contact_email() FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION handle_contact_email() TO postgres; 