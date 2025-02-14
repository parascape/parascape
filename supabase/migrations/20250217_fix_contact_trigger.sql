-- Revoke overly broad permissions
REVOKE ALL ON contact_submissions FROM anon, authenticated;

-- Grant only necessary permissions
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT SELECT ON public.contact_submissions TO authenticated;

-- Allow access to the service role key
GRANT SET ON PARAMETER "app.edge_function_key" TO postgres;
GRANT SET ON PARAMETER "secrets.service_role_key" TO postgres;

-- Update the notification function to include all necessary fields and handle errors
CREATE OR REPLACE FUNCTION notify_new_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  response_status INT;
  response_body JSONB;
  service_role_key TEXT;
BEGIN
    -- Log the start of function execution
    RAISE NOTICE 'Processing new submission: %', NEW.id;

    -- Set the service role key directly
    service_role_key := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTUxMjA4MiwiZXhwIjoyMDU1MDg4MDgyfQ.3U72os4aO9g7rc3Dg4ewMh198J-XZ8j4-iS-UKBkyDo';

    -- Log the key being used (masked for security)
    RAISE NOTICE 'Using service role key: %...%', LEFT(service_role_key, 4), RIGHT(service_role_key, 4);

    SELECT
        status, content::jsonb INTO response_status, response_body
    FROM
        net.http_post(
            url:='https://hpuqzerpfylevdfwembv.supabase.co/functions/v1/handle-contact-email',
            headers:=jsonb_build_object(
                'Content-Type', 'application/json',
                'Authorization', format('Bearer %s', service_role_key)
            ),
            body:=jsonb_build_object(
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
            WHEN response_status != 200 THEN response_body->>'error'
            ELSE NULL
        END
    WHERE id = NEW.id;

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log any errors
        RAISE WARNING 'Error in notify_new_submission: %', SQLERRM;
        
        -- Update the submission with the error
        UPDATE contact_submissions
        SET
            status = 'failed',
            error_message = SQLERRM
        WHERE id = NEW.id;
        
        RETURN NEW;
END;
$$;

-- Ensure the trigger is properly set up
DROP TRIGGER IF EXISTS on_new_submission ON contact_submissions;
CREATE TRIGGER on_new_submission
    AFTER INSERT ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION notify_new_submission();

-- Grant execute permission on the function
REVOKE EXECUTE ON FUNCTION notify_new_submission() FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION notify_new_submission() TO postgres; 