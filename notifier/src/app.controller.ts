import { Controller } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly notifierService: AppService) {}

  @EventPattern('notification')
  async sendNotification(notificationDto: NotificationDto): Promise<void> {
    this.notifierService.sendNotification(notificationDto);
  }
}
