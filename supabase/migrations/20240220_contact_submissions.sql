-- Create contact submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business TEXT NOT NULL,
  phone TEXT,
  about TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('contact', 'audit_request')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'failed')),
  email_sent BOOLEAN DEFAULT FALSE
);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from authenticated users and service role
CREATE POLICY "Allow inserts from authenticated users"
  ON contact_submissions
  FOR INSERT
  TO authenticated, service_role
  WITH CHECK (true);

-- Create policy to allow service role to update
CREATE POLICY "Allow service role to update"
  ON contact_submissions
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create webhook function
CREATE OR REPLACE FUNCTION handle_new_submission()
RETURNS TRIGGER AS $$
BEGIN
  -- Make HTTP request to Edge Function
  PERFORM
    net.http_post(
      url := current_setting('app.edge_function_url') || '/send-confirmation-email',
      body := json_build_object(
        'id', NEW.id,
        'name', NEW.name,
        'email', NEW.email,
        'business', NEW.business,
        'type', NEW.type
      )::text,
      headers := json_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.edge_function_key')
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new submissions
CREATE TRIGGER on_new_submission
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_submission(); 