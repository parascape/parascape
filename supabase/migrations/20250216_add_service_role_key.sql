-- Store the service role key in the vault
SELECT set_config(
    'app.settings.service_role_key',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdXF6ZXJwZnlsZXZkZndlbWJ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTIxNzA1NywiZXhwIjoyMDU0NzkzMDU3fQ.aqvxHhZCdYHJDk_qgxj_kRQVZNAKVEGP-dCrUvjBaZo',
    false
); 