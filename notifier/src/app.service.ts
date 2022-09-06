import { Injectable } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from 'nestjs-pino';

@Injectable()
export class AppService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly logger: Logger,
  ) {}

  async sendNotification(notificationDto: NotificationDto): Promise<void> {
    const { emails, message } = notificationDto;

    try {
      const info = await this.mailerService.sendMail({
        to: emails.join(', '),
        subject: 'Notification',
        text: message,
      });
      this.logger.log(`Message sent: ${info.messageId}`);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
