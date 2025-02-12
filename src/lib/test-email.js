const { Resend } = require('resend');

// Initialize Resend with API key
const resend = new Resend('re_E67XP4W1_71WZWZ5tAvzDepCDJsqHTjtq');

// Simple test to verify Resend API call
const testEmail = async () => {
  try {
    console.log('Sending test email...');
    console.log('From:', 'contact@connect.parascape.org');
    console.log('To:', ['contact@parascape.org', 'recordsparascape@gmail.com']);
    
    const result = await resend.emails.send({
      from: 'contact@connect.parascape.org',
      to: ['contact@parascape.org', 'recordsparascape@gmail.com'],
      subject: 'Test Email - Multiple Recipients',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email sent at: ${new Date().toISOString()}</p>
        <p>If you receive this, please check that:</p>
        <ul>
          <li>The sender shows as contact@connect.parascape.org</li>
          <li>The email is properly formatted</li>
          <li>It's not in spam/junk folder</li>
        </ul>
      `
    });

    console.log('Full API Response:', result);
    console.log('Email sent successfully!');
    console.log('Email ID:', result.id);
  } catch (error) {
    console.error('Detailed error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  }
};

testEmail(); 