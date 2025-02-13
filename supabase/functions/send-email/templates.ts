export interface EmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'contact' | 'audit';
}

export function getUserEmailTemplate(data: EmailData): string {
  return `
    <h1>Thank you for reaching out, ${data.name}!</h1>
    <p>We've received your message and will get back to you as soon as possible.</p>
    <p>Here's a copy of your message:</p>
    <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
      ${data.message}
    </div>
    <p>Best regards,<br>The Parascape Team</p>
  `;
}

export function getAdminEmailTemplate(data: EmailData): string {
  return `
    <h1>New ${data.type} Form Submission</h1>
    <h2>Contact Details:</h2>
    <ul>
      <li><strong>Name:</strong> ${data.name}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Phone:</strong> ${data.phone}</li>
      <li><strong>Form Type:</strong> ${data.type}</li>
    </ul>
    <h2>Message:</h2>
    <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
      ${data.message}
    </div>
  `;
} 