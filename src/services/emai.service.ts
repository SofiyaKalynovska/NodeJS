import nodemailer from 'nodemailer';
import { config } from '../configs/config';
class EmailService {
  private transporter;
  constructor () {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      from: 'Node.js',
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPasswords
      }
    });
  }
  public async sendEmail (email: string): Promise<any> {
    const info = await this.transporter.sendMail({
      from: config.smtpEmail,
      to: email,
      subject: 'Test',
      text: 'Test'
    });
    return info;
  }
}

export const emailService = new EmailService();
