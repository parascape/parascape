-- Add status enum type
CREATE TYPE submission_status AS ENUM ('pending', 'spam', 'verified', 'contacted', 'completed');

-- Add new columns to form_submissions
ALTER TABLE form_submissions
ADD COLUMN status submission_status DEFAULT 'pending',
ADD COLUMN ip_address text,
ADD COLUMN submission_count integer DEFAULT 1,
ADD COLUMN last_submission_at timestamptz DEFAULT now();

-- Create index for IP address lookups
CREATE INDEX idx_form_submissions_ip_address ON form_submissions(ip_address);

-- Create function to check rate limiting
CREATE OR REPLACE FUNCTION check_submission_rate_limit(
  submission_ip text,
  max_submissions integer DEFAULT 5,
  window_minutes integer DEFAULT 60
) RETURNS boolean AS $$
DECLARE
  recent_count integer;
BEGIN
  SELECT COUNT(*)
  INTO recent_count
  FROM form_submissions
  WHERE ip_address = submission_ip
    AND created_at > now() - (window_minutes || ' minutes')::interval;
    
  RETURN recent_count < max_submissions;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 