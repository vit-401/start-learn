import nodemailer from 'nodemailer';
import {google} from "googleapis";
import SMTPTransport from "nodemailer/lib/smtp-transport";


const YOUR_CLIENT_ID = "414683619621-l8luvg2mcrjbtqko7636f1cncsm6p9g8.apps.googleusercontent.com"
const YOUR_CLIENT_SECRET = "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"
const REDIRECT_URI = "http://localhost:3000/auth/google/callbac"
const YOUR_REFRESH_TOKEN = "1//049def3ETBVgKCgYIARAAGAQSNwF-L9Iryx4kZ_85n-pOmE7LOZZ2L3g5M9SI5VnuGE0U7y9bhLe52TBs9umlBlPS39myW3WAdcI"
const ACCESS_TOKEN = "ya29.a0Ael9sCMe4jS4e-nkrLfPZTbLOhDxsUobiqeclR9AkJ3ReMlH3Eipiv5CwW21tXCPB1iwKpYljGqylJzcRmVXmQyhTNlHD5Mcxuo1RoOzZrX3f-5pwnTfv58LmDmg_DelLH1d82-YAuhCd9Ye4GF9ik-7hwmDaCgYKAZUSARISFQF4udJhNdTXJiXbltk900JVyUIWlQ0163"



const oAuth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: YOUR_REFRESH_TOKEN,
});


export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(config: SMTPTransport | SMTPTransport.Options | string,) {
    this.transporter = nodemailer.createTransport(config);
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
    user: 'ebackvitaliy@gmail.com',
    type: 'OAUTH2',
    clientId: YOUR_CLIENT_ID,
    clientSecret: YOUR_CLIENT_SECRET,
    refreshToken: YOUR_REFRESH_TOKEN,
    accessToken: ACCESS_TOKEN,
  },
});
