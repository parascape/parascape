-- Create an enum for submission types
CREATE TYPE submission_type AS ENUM ('contact', 'audit');

-- Create the contact submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  type submission_type NOT NULL DEFAULT 'contact',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for Edge Function to insert submissions
CREATE POLICY "Allow Edge Function to insert submissions"
  ON contact_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy for Edge Function to read submissions
CREATE POLICY "Allow Edge Function to read submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column(); 