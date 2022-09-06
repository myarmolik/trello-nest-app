import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationDto } from './dto/notification.dto';
import { HttpService } from '@nestjs/axios';
import { Logger } from 'nestjs-pino';

@Injectable()
export class NotifierService {
  constructor(
    private readonly config: ConfigService,
    private readonly logger: Logger,
    private readonly httpService: HttpService,
  ) {}

  async sendNotification(notification: NotificationDto): Promise<void> {
    const url = this.config.get<string>('NOTIFIER_URL');
    this.httpService.post(url, notification).subscribe({
      error: (error) => {
        this.logger.error(error.message);
      },
    });
  }
}
