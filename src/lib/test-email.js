import { Resend } from 'resend';

const resend = new Resend('re_E67XP4W1_71WZWZ5tAvzDepCDJsqHTjtq');

async function testEmail() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'recordsparascape@gmail.com',
      subject: 'Test Email',
      html: '<p>This is a test email from Parascape</p>'
    });

    console.log('Test email sent successfully:', data);
  } catch (error) {
    console.error('Failed to send test email:', error);
  }
}

testEmail(); 