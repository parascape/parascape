-- Create a function to handle contact form submissions
CREATE OR REPLACE FUNCTION handle_contact_submission(
    p_name TEXT,
    p_email TEXT,
    p_phone TEXT,
    p_message TEXT,
    p_type TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_submission_id UUID;
    v_edge_function_response JSON;
    v_project_ref TEXT := 'hpuqzerpfylevdfwembv';
    v_service_role_key TEXT;
BEGIN
    -- Get the service role key from vault
    v_service_role_key := current_setting('app.settings.service_role_key', true);
    
    IF v_service_role_key IS NULL THEN
        RAISE EXCEPTION 'Service role key not found in vault';
    END IF;

    -- Insert the submission first
    INSERT INTO contact_submissions (name, email, phone, message, type)
    VALUES (p_name, p_email, p_phone, p_message, p_type)
    RETURNING id INTO v_submission_id;

    -- Call the Edge Function using pg_net
    SELECT content::json INTO v_edge_function_response
    FROM net.http_post(
        url:='https://hpuqzerpfylevdfwembv.supabase.co/functions/v1/send-email',
        headers:=jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer ' || v_service_role_key
        ),
        body:=jsonb_build_object(
            'name', p_name,
            'email', p_email,
            'phone', p_phone,
            'message', p_message,
            'type', p_type
        )
    );

    -- Update submission status based on Edge Function response
    UPDATE contact_submissions
    SET 
        status = CASE 
            WHEN v_edge_function_response->>'success' = 'true' THEN 'processed'
            ELSE 'failed'
        END,
        email_sent = (v_edge_function_response->>'success')::boolean,
        email_sent_at = CASE 
            WHEN v_edge_function_response->>'success' = 'true' THEN NOW()
            ELSE NULL
        END,
        error_message = v_edge_function_response->>'error'
    WHERE id = v_submission_id;

    RETURN v_edge_function_response;
EXCEPTION
    WHEN OTHERS THEN
        -- Update submission status on error
        IF v_submission_id IS NOT NULL THEN
            UPDATE contact_submissions
            SET 
                status = 'failed',
                error_message = SQLERRM
            WHERE id = v_submission_id;
        END IF;
        
        RETURN json_build_object(
            'success', false,
            'error', SQLERRM
        );
END;
$$;

-- Enable the pg_net extension for making HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Grant execute permission to authenticated and anonymous users
GRANT EXECUTE ON FUNCTION handle_contact_submission(TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated, anon; 