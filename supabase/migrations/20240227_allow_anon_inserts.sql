-- Allow anonymous users to insert into contact_submissions table
DROP POLICY IF EXISTS "Allow inserts from anon" ON contact_submissions;

-- Create policy to allow inserts from anonymous users
CREATE POLICY "Allow inserts from anon"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Grant insert permission to anonymous users
GRANT INSERT ON contact_submissions TO anon;

-- Ensure the table is accessible to anonymous users
GRANT USAGE ON SCHEMA public TO anon;

-- Update the trigger function to include proper error handling
CREATE OR REPLACE FUNCTION handle_new_submission()
RETURNS TRIGGER AS $$
DECLARE
  edge_function_url TEXT := 'https://hpuqzerpfylevdfwembv.supabase.co/functions/v1/send-confirmation-email';
  anon_key TEXT := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MTIwODIsImV4cCI6MjA1NTA4ODA4Mn0.JYRebBYLMwMYX2FRfNMmV7NDzNZHTeADPdy6CIobzaM';
BEGIN
  -- Make HTTP request to Edge Function
  BEGIN
    PERFORM
      net.http_post(
        url := edge_function_url,
        body := json_build_object(
          'id', NEW.id,
          'name', NEW.name,
          'email', NEW.email,
          'business', NEW.business,
          'type', NEW.type
        )::text,
        headers := json_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || anon_key
        )
      );
    EXCEPTION WHEN OTHERS THEN
      -- Log error but don't prevent insert
      RAISE WARNING 'Error calling edge function: %', SQLERRM;
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql; 