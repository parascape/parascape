-- Create a function to handle contact form submissions
CREATE OR REPLACE FUNCTION handle_contact_submission(
  p_name TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_message TEXT,
  p_type TEXT
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_submission_id UUID;
  v_result json;
BEGIN
  -- Insert the submission
  INSERT INTO public.contact_submissions (
    name,
    email,
    phone,
    message,
    type,
    status
  )
  VALUES (
    p_name,
    p_email,
    p_phone,
    p_message,
    p_type,
    'pending'
  )
  RETURNING id INTO v_submission_id;

  -- Call the Edge Function using pg_net (this will be handled by a separate webhook)
  -- For now, just return the submission ID
  v_result := json_build_object(
    'success', true,
    'submission_id', v_submission_id
  );

  RETURN v_result;
EXCEPTION
  WHEN others THEN
    RETURN json_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$; 