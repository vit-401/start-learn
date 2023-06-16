import nodemailer from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {User} from "../models/user";
import {injectable} from "inversify";

const PASSWORDAPP = "dbasxiqxxjpqgyfx"

@injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(protected config: SMTPTransport | SMTPTransport.Options | string,) {
    this.transporter = nodemailer.createTransport(config);
  }

  public async sendEmailConfirmationMessage(user: User): Promise<void> {
    const {accountData, emailConfirmation} = user
    const mailOptions = {
      from: 'Vitaliy <ebackvitaliy@gmail.com>',
      to: accountData.email,
      subject: "Confirmation email",
      html: `<a href=\"http://localhost:3000/auth/confirm-email?token=${emailConfirmation.confirmationCode}\">Confirm email</a>`, // html body
    };


    await this.transporter.sendMail(mailOptions);
  }

  public async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const mailOptions = {
      from: 'Vitaliy <ebackvitaliy@gmail.com>',
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
    user: 'ebackvitaliy@gmail.com', //
    pass: PASSWORDAPP,
  },
});
