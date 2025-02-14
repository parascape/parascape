-- Enable the pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create a function to call the Edge Function
CREATE OR REPLACE FUNCTION handle_contact_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  response_status INT;
  response_body JSONB;
BEGIN
  -- Make HTTP POST request to the Edge Function
  SELECT
    status, content::jsonb INTO response_status, response_body
  FROM
    net.http_post(
      url:='https://hpuqzerpfylevdfwembv.supabase.co/functions/v1/handle-contact-email',
      headers:=jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', format('Bearer %s', current_setting('app.edge_function_key'))
      ),
      body:=to_jsonb(NEW)
    );

  -- Update the row with the response status
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
      WHEN response_status != 200 THEN response_body->>'error'
      ELSE NULL
    END
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS trigger_handle_contact_email ON contact_submissions;
CREATE TRIGGER trigger_handle_contact_email
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION handle_contact_email();

-- Set the Edge Function key as a database parameter
-- Note: Replace this with your actual service role key in production
ALTER DATABASE postgres SET app.edge_function_key = current_setting('secrets.service_role_key'); 