import express, { Request, Response } from 'express';
import {emailService} from "../service/emailService";

export const emailRouter = express.Router();

emailRouter.post('/send', async (req: Request, res: Response) => {
  const { to, subject, body } = req.body;
  try {
    await emailService.sendEmail(to, subject, body);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send email' });
  }
});
