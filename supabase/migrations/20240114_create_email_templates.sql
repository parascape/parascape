-- Create email templates table
CREATE TABLE email_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    variables JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create initial templates
INSERT INTO email_templates (name, subject, body, variables) VALUES
-- Welcome Email (Immediate)
('welcome', 'Welcome to Parascape - Let''s Transform Your Digital Presence', '
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #10B981;">Welcome to Parascape, {{name}}!</h1>
    
    <p>Thank you for reaching out about {{business}}. We''re excited to explore how we can help transform your digital presence.</p>
    
    <h2 style="color: #374151;">What happens next?</h2>
    <ul>
        <li>Our team is reviewing your message</li>
        <li>We''ll reach out within 24 hours to schedule a discovery call</li>
        <li>We''ll prepare some initial thoughts about {{business}}''s digital potential</li>
    </ul>

    <p>In the meantime, you might be interested in exploring some of our success stories:</p>
    <ul>
        <li><a href="/success-stories#web" style="color: #10B981;">Web Development Transformations</a></li>
        <li><a href="/success-stories#brand" style="color: #10B981;">Brand Evolution Stories</a></li>
    </ul>

    <p style="color: #6B7280; font-style: italic;">P.S. Feel free to reply to this email if you think of anything else you''d like to share about your vision for {{business}}.</p>
</div>
', '["name", "business"]'),

-- Follow-up Email (24 hours if no response)
('follow_up', 'Quick Follow-up: Your Digital Journey with Parascape', '
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <p>Hi {{name}},</p>
    
    <p>I wanted to follow up on your interest in transforming {{business}}''s digital presence. We''ve had a chance to review your message and have some initial thoughts we''d love to share.</p>
    
    <p>Would you be available for a brief 15-minute discovery call? You can:</p>
    <ul>
        <li>Reply to this email with your preferred time</li>
        <li><a href="/contact/schedule" style="color: #10B981;">Schedule directly on our calendar</a></li>
        <li>Call us at 1(707)362-6816</li>
    </ul>

    <p>During this call, we can:</p>
    <ul>
        <li>Discuss your vision for {{business}}</li>
        <li>Share relevant case studies</li>
        <li>Outline potential next steps</li>
    </ul>

    <p style="color: #6B7280;">Looking forward to connecting!</p>
</div>
', '["name", "business"]'),

-- Value-Add Email (3 days if no response)
('value_add', 'Digital Growth Tips for {{business}}', '
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <p>Hi {{name}},</p>
    
    <p>While reviewing your message about {{business}}, I thought you might find these quick tips valuable:</p>
    
    <h3 style="color: #10B981;">3 Quick Wins for Digital Growth</h3>
    <ol>
        <li><strong>Local SEO Optimization</strong> - Ensure your Google Business Profile is complete and active</li>
        <li><strong>Social Proof</strong> - Showcase customer testimonials prominently on your website</li>
        <li><strong>Mobile Experience</strong> - Test your website on multiple devices for consistency</li>
    </ol>

    <p>We''d love to discuss how we can help implement these and other strategies for {{business}}. Ready to chat?</p>
    
    <a href="/contact/schedule" style="display: inline-block; background: #10B981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Schedule a Call</a>

    <p style="color: #6B7280; margin-top: 20px;">P.S. These are just general tips - we''d love to provide more specific insights for your business during a brief call.</p>
</div>
', '["name", "business"]');

-- Create function to get template by name
CREATE OR REPLACE FUNCTION get_email_template(template_name TEXT, template_vars JSONB)
RETURNS TABLE (subject TEXT, body TEXT) AS $$
DECLARE
    template RECORD;
    rendered_subject TEXT;
    rendered_body TEXT;
    var_name TEXT;
    var_value TEXT;
BEGIN
    -- Get the template
    SELECT * INTO template FROM email_templates WHERE name = template_name;
    
    -- Start with the template content
    rendered_subject := template.subject;
    rendered_body := template.body;
    
    -- Replace each variable
    FOR var_name, var_value IN SELECT * FROM jsonb_each_text(template_vars)
    LOOP
        rendered_subject := replace(rendered_subject, '{{' || var_name || '}}', var_value);
        rendered_body := replace(rendered_body, '{{' || var_name || '}}', var_value);
    END LOOP;
    
    RETURN QUERY SELECT rendered_subject, rendered_body;
END;
$$ LANGUAGE plpgsql; 