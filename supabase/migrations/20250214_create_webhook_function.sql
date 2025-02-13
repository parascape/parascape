-- Enable the pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create the webhook function
CREATE OR REPLACE FUNCTION process_contact_submission()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_service_role_key text;
BEGIN
  -- Get the service role key from vault.secrets
  SELECT decrypted_secret INTO v_service_role_key FROM vault.decrypted_secrets 
  WHERE name = 'supabase_service_role_key' LIMIT 1;

  -- Make the HTTP request to the Edge Function
  PERFORM net.http_post(
    url := 'https://hpuqzerpfylevdfwembv.supabase.co/functions/v1/send-email',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || v_service_role_key,
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'name', NEW.name,
      'email', NEW.email,
      'phone', NEW.phone,
      'message', NEW.message,
      'type', NEW.type
    )
  );

  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Update the submission status to failed
    UPDATE public.contact_submissions
    SET 
      status = 'failed',
      error_message = SQLERRM
    WHERE id = NEW.id;
    
    RETURN NEW;
END;
$$;

-- Create or replace the trigger
DROP TRIGGER IF EXISTS trigger_process_contact_submission ON public.contact_submissions;

CREATE TRIGGER trigger_process_contact_submission
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION process_contact_submission(); 