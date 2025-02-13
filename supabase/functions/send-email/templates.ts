export interface EmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
  type: string;
}

export function getUserEmailTemplate(data: EmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Thank you for contacting Parascape</title>
      </head>
      <body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; color: #1f2937; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 32px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
          <img src="https://parascape.org/logo.png" alt="Parascape Logo" style="display: block; margin: 0 auto 24px; max-width: 200px; height: auto;">
          <h1 style="color: #059669; margin-bottom: 24px; text-align: center;">Thank you for reaching out, ${data.name}!</h1>
          <p style="margin-bottom: 16px; line-height: 1.6;">We've received your ${data.type} request and will get back to you within 24-48 hours.</p>
          <p style="margin-bottom: 8px; line-height: 1.6;">Here's a copy of your message:</p>
          <div style="background-color: #f3f4f6; padding: 16px; margin: 16px 0; border-radius: 6px; line-height: 1.6;">
            ${data.message}
          </div>
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; line-height: 1.6;">
              Best regards,<br>
              <strong>The Parascape Team</strong>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function getAdminEmailTemplate(data: EmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; color: #1f2937; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 32px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #059669; margin-bottom: 24px;">New ${data.type} Form Submission</h1>
          <div style="background-color: #f3f4f6; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h2 style="color: #374151; margin: 0 0 16px 0;">Contact Details:</h2>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 12px; line-height: 1.6;"><strong>Name:</strong> ${data.name}</li>
              <li style="margin-bottom: 12px; line-height: 1.6;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #059669;">${data.email}</a></li>
              <li style="margin-bottom: 12px; line-height: 1.6;"><strong>Phone:</strong> <a href="tel:${data.phone}" style="color: #059669;">${data.phone}</a></li>
              <li style="line-height: 1.6;"><strong>Form Type:</strong> ${data.type}</li>
            </ul>
          </div>
          <h2 style="color: #374151; margin-bottom: 16px;">Message:</h2>
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; line-height: 1.6;">
            ${data.message}
          </div>
          <div style="margin-top: 32px; text-align: center;">
            <a href="mailto:${data.email}?subject=Re: ${data.type} Form Submission" 
               style="display: inline-block; background-color: #059669; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px;">
              Reply to ${data.name}
            </a>
          </div>
        </div>
      </body>
    </html>
  `;
} 