import nodemailer from 'nodemailer';

export interface EmailConfig {
  service: string;
  auth: {
    user: string;
    pass: string;
  };
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(config: EmailConfig) {
    this.transporter = nodemailer.createTransport(config);
  }

  public async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const mailOptions = {
      from: 'Your Name <youremail@example.com>',
      to,
      subject,
      html: body,
    };
    await this.transporter.sendMail(mailOptions);
  }
}

export const emailService = new EmailService({
  service: 'gmail',
  auth: {
    user: 'yourgmailusername',
    pass: 'yourgmailpassword',
  },
});
