-- Drop existing function and trigger if they exist
DROP TRIGGER IF EXISTS on_new_submission ON contact_submissions;
DROP FUNCTION IF EXISTS handle_new_submission();

-- Create the webhook function
CREATE OR REPLACE FUNCTION handle_new_submission()
RETURNS TRIGGER AS $$
DECLARE
  edge_function_url TEXT := 'https://hpuqzerpfylevdfwembv.supabase.co/functions/v1/send-confirmation-email';
  service_role_key TEXT := current_setting('request.jwt.claim.role', true);
BEGIN
  -- Make HTTP request to Edge Function
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
        'Authorization', 'Bearer ' || service_role_key
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new submissions
CREATE TRIGGER on_new_submission
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_submission(); 