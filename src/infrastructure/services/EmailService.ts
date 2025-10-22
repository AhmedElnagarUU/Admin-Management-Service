// File: src/infrastructure/services/EmailService.ts
// ==============================================
// Purpose:
//   - Send emails (verification, password reset)
//   - Can integrate with SendGrid, SES, etc.
// ==============================================

export class EmailService {
  static async send(to: string, subject: string, body: string): Promise<void> {
    console.log(`Email sent to ${to}: ${subject} - ${body}`);
    // Real implementation goes here
  }
}
