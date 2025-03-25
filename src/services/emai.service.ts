import nodemailer, { Transporter } from 'nodemailer';
import { config } from '../configs/config';
import hbs from 'nodemailer-express-handlebars';
import path from 'node:path';
import { emailConstants } from '../constants/email.constants';
import { EmailTypeEnum } from '../enums/email-type.enum';
class EmailService {
  private transporter: Transporter;
  constructor () {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      from: 'Node.js',
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPasswords
      }
    });
    const hbsOptions = {
      viewEngine: {
        extname: '.hbs',
        layoutsDir: path.join(process.cwd(), 'src', 'templates', 'layouts'),
        defaultLayout: 'main',
        partialsDir: path.join(process.cwd(), 'src', 'templates', 'partials')
      },
      viewPath: path.join(process.cwd(), 'src', 'templates', 'views'),
      extName: '.hbs'
    };
    this.transporter.use('compile', hbs(hbsOptions));
  }

  public async sendEmail (type: EmailTypeEnum, email: string, context: any): Promise<any> {
    const { subject, template } = emailConstants[type];
    const mailOptions = {
      to: email,
      subject,
      template,
      context
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

export const emailService = new EmailService();
