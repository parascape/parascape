declare module 'resend' {
  export class Resend {
    constructor(apiKey: string);

    emails: {
      send(data: {
        from: string;
        to: string;
        subject: string;
        html?: string;
        text?: string;
        reply_to?: string;
        cc?: string;
        bcc?: string;
        attachments?: Array<{
          filename: string;
          content: string;
        }>;
      }): Promise<{
        id: string;
        from: string;
        to: string;
        created_at: string;
      }>;
    };
  }
}

declare module 'node:buffer' {
  export interface Buffer {
    toString(encoding?: string): string;
  }
}
