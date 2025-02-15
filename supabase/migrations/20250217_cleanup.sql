-- Drop unused tables and functions
DROP TABLE IF EXISTS public.contacts CASCADE;
DROP FUNCTION IF EXISTS public.notify_new_submission();
DROP FUNCTION IF EXISTS public.handle_contact_submission();

-- Revoke all permissions and reset
REVOKE ALL ON public.contact_submissions FROM anon, authenticated;

-- Grant minimal required permissions
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT SELECT ON public.contact_submissions TO authenticated;

-- Ensure trigger function has correct permissions
REVOKE EXECUTE ON FUNCTION handle_contact_email() FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION handle_contact_email() TO postgres;

-- Drop any duplicate triggers
DROP TRIGGER IF EXISTS on_new_submission ON contact_submissions;
DROP TRIGGER IF EXISTS notify_new_submission_trigger ON contact_submissions;

-- Ensure only one trigger exists
DROP TRIGGER IF EXISTS handle_contact_email_trigger ON contact_submissions;
CREATE TRIGGER handle_contact_email_trigger
    AFTER INSERT ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION handle_contact_email(); 