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

-- Create the notification function
CREATE OR REPLACE FUNCTION notify_new_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    PERFORM net.http_post(
        'https://hpuqzerpfylevdfwembv.supabase.co/functions/v1/handle-contact-email',
        jsonb_build_object(
            'name', NEW.name,
            'email', NEW.email,
            'phone', NEW.phone,
            'message', NEW.message,
            'type', NEW.type
        ),
        jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTUxMjA4MiwiZXhwIjoyMDU1MDg4MDgyfQ.3U72os4aO9g7rc3Dg4ewMh198J-XZ8j4-iS-UKBkyDo'
        )
    );
    RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS on_new_submission ON contact_submissions;
CREATE TRIGGER on_new_submission
    AFTER INSERT ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION notify_new_submission();

-- Grant necessary permissions
GRANT ALL ON contact_submissions TO postgres, anon, authenticated;
GRANT EXECUTE ON FUNCTION notify_new_submission() TO postgres, anon, authenticated; 