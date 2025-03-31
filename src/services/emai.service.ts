import nodemailer, { Transporter } from 'nodemailer';
import { config } from '../configs/config';
import hbs from 'nodemailer-express-handlebars';
import path from 'node:path';
import { emailConstants } from '../constants/email.constants';
import { EmailTypeEnum } from '../enums/email-type.enum';
import { EmailTypeToPayloadType } from '../types/email-type-to-payload.type';
import { ApiError } from '../errors/api-error';
class EmailService {
  private transporter: Transporter;
  constructor () {
    const smtpEmail = config.smtpEmail;
    const smtpPassword = config.smtpPasswords;
    if (!smtpEmail || !smtpPassword) {
      throw new ApiError(
        'SMTP credentials are missing. Please provide them in the environment variables.',
        400
      );
    }
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      from: 'Node.js',
      auth: {
        user: smtpEmail,
        pass: smtpPassword
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

  public async sendEmail<T extends EmailTypeEnum> (
    type: T,
    email: string,
    context: EmailTypeToPayloadType[T]
  ): Promise<any> {
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
