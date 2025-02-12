// Simple test to verify Resend API call
const testEmail = async () => {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer re_E67XP4W1_71WZWZ5tAvzDepCDJsqHTjtq',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'contact@connect.parascape.org',
        to: 'recordsparascape@gmail.com',
        subject: 'Test Email',
        html: '<p>This is a test email</p>'
      })
    });

    const result = await response.json();
    console.log('Response:', result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email');
    }

    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
};

testEmail(); 