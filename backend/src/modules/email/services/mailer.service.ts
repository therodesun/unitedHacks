import { Injectable } from '@nestjs/common';
import { SendMailOptions, createTransport } from 'nodemailer';
import {
  EMAIL_HOST,
  EMAIL_PASSWORD,
  EMAIL_USER,
} from 'src/modules/environment/environment';
import { CustomLoggerService } from 'src/modules/logger/services';
import { IMailOptions } from '../types';

@Injectable()
export class MailerService {
  constructor(private readonly logger: CustomLoggerService) {}

  mailTransport() {
    const transporter = createTransport({
      host: EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });
    return transporter;
  }

  async sendMail(options: IMailOptions): Promise<any> {
    try {
      const { from, to, cc, bcc, subject, html } = options;
      const transport = this.mailTransport();

      const mailOptions: SendMailOptions = {
        from: `${from.name} ${from.address}`,
        to: to.trim(),
        cc: cc || [],
        bcc: bcc || [],
        subject: subject.trim(),
        html,
      };

      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (e) {
      this.logger.error(e);
    }
  }
}
