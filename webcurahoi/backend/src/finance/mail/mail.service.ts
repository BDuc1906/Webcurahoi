import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { env } from '../../config/env';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  private readonly transporter = env.SMTP_HOST
    ? nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_PORT === 465,
        auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
      })
    : null;

  /** Trả true nếu đã gửi. Chưa cấu hình SMTP thì chỉ ghi log. */
  async send(to: string, subject: string, html: string): Promise<boolean> {
    if (!this.transporter) {
      this.logger.warn(`Chưa cấu hình SMTP, bỏ qua gửi email tới ${to}`);
      return false;
    }
    await this.transporter.sendMail({ from: env.MAIL_FROM, to, subject, html });
    return true;
  }
}
