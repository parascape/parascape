-- Allow setting custom parameters
GRANT SET ON PARAMETER "app.edge_function_key" TO postgres;
GRANT SET ON PARAMETER "secrets.service_role_key" TO postgres;

-- Set up the Edge Function key as a database parameter
DO $$
BEGIN
    -- First try to remove if it exists
    EXECUTE format('ALTER DATABASE %I RESET app.edge_function_key', current_database());
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END $$;

-- Set the service role key directly
ALTER DATABASE postgres SET "secrets.service_role_key" = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTUxMjA4MiwiZXhwIjoyMDU1MDg4MDgyfQ.3U72os4aO9g7rc3Dg4ewMh198J-XZ8j4-iS-UKBkyDo';

-- Set the edge function key to use the same service role key
ALTER DATABASE postgres SET app.edge_function_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTUxMjA4MiwiZXhwIjoyMDU1MDg4MDgyfQ.3U72os4aO9g7rc3Dg4ewMh198J-XZ8j4-iS-UKBkyDo';

-- Verify the settings are accessible
DO $$
DECLARE
    edge_key TEXT;
    service_key TEXT;
BEGIN
    edge_key := current_setting('app.edge_function_key', true);
    service_key := current_setting('secrets.service_role_key', true);
    
    IF edge_key IS NULL OR edge_key = '' THEN
        RAISE EXCEPTION 'Edge function key is not properly set';
    END IF;
    
    IF service_key IS NULL OR service_key = '' THEN
        RAISE EXCEPTION 'Service role key is not properly set';
    END IF;
    
    RAISE NOTICE 'Keys configured successfully';
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Key verification failed: %', SQLERRM;
END $$; 