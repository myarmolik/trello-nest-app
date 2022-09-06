import { Body, Controller, Post } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly notifierService: AppService) {}

  @Post('*')
  acceptReq(@Body() notificationDto: NotificationDto): void {
    this.notifierService.sendNotification(notificationDto);
  }
}
