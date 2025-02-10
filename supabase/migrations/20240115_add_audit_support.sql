-- Add type column to form_submissions
ALTER TABLE public.form_submissions 
ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'contact';

-- Add unique constraint on email_templates name if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'email_templates_name_key'
    ) THEN
        ALTER TABLE public.email_templates
        ADD CONSTRAINT email_templates_name_key UNIQUE (name);
    END IF;
END $$;

-- Create audit_welcome email template
INSERT INTO public.email_templates (name, subject, body) 
VALUES (
  'audit_welcome',
  'Your Digital Audit Request - Parascape',
  E'<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #10B981;">Digital Audit Request Received</h1>
    <p>Thank you for requesting a digital presence audit for {{business}}.</p>
    <p>Our team will conduct a thorough analysis of your digital presence and send you a detailed report within 24 hours.</p>
    <p>The audit will include:</p>
    <ul style="list-style-type: none; padding-left: 0;">
      <li style="margin: 10px 0; padding-left: 25px; position: relative;">
        <span style="color: #10B981; position: absolute; left: 0;">✓</span>
        SEO Performance Analysis
      </li>
      <li style="margin: 10px 0; padding-left: 25px; position: relative;">
        <span style="color: #10B981; position: absolute; left: 0;">✓</span>
        User Experience Review
      </li>
      <li style="margin: 10px 0; padding-left: 25px; position: relative;">
        <span style="color: #10B981; position: absolute; left: 0;">✓</span>
        Competitor Comparison
      </li>
    </ul>
    <p>While you wait for your audit, feel free to explore our services at <a href="https://parascape.org" style="color: #10B981;">parascape.org</a>.</p>
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 14px;">Best regards,<br>The Parascape Team</p>
    </div>
  </div>'
) ON CONFLICT (name) DO UPDATE 
SET subject = EXCLUDED.subject,
    body = EXCLUDED.body; 