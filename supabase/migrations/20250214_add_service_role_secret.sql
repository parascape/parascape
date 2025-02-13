-- Enable the vault extension if not already enabled
CREATE EXTENSION IF NOT EXISTS vault;

-- Insert the service role key into vault.secrets
INSERT INTO vault.secrets (
  name,
  secret,
  description
)
VALUES (
  'supabase_service_role_key',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTIxNzA1NywiZXhwIjoyMDU0NzkzMDU3fQ.Oi6VFVlOYGVxDQFPRKEWEZBGxRVGxGDGCXvKGBPBEQE',
  'Service role key for Edge Function authentication'
)
ON CONFLICT (name) 
DO UPDATE SET 
  secret = EXCLUDED.secret,
  description = EXCLUDED.description; 