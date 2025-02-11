-- Set environment variables using the correct SQL syntax
SELECT
    set_config('app.settings.supabase_url', 'https://hpuqzerpfylevdfwembv.supabase.co', false),
    set_config('app.settings.supabase_anon_key', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NzI5NjAsImV4cCI6MjAyNjQ0ODk2MH0.Ij9XFqQFEFVGGfOEGQRbYxZGmxn_Wd_zVH_HsHrYaYo', false),
    set_config('app.settings.resend_api_key', 're_H3gwg6YT_EKSmLHBE3fZCLd44Ngo1thXw', false);

-- Verify the settings were set correctly
SELECT current_setting('app.settings.supabase_url'),
       current_setting('app.settings.supabase_anon_key'),
       current_setting('app.settings.resend_api_key'); 