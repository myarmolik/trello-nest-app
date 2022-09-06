import { Connection, EntitySubscriberInterface, UpdateEvent } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { NotifierService } from '../../../modules/notifier.service';
import { Card } from '../entities/card.entity';
import { UsersService } from '../../users/users.service';

@Injectable()
export class CardSubscriber implements EntitySubscriberInterface<Card> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly notifierService: NotifierService,
    private readonly userService: UsersService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo(): any {
    return Card;
  }

  async afterUpdate(event: UpdateEvent<Card>): Promise<void> {
    const users = await this.userService.findAll();
    const emails = users.map((u) => u.email);

    this.notifierService.sendNotification({
      message: `AFTER CARD UPDATED: ${JSON.stringify(event.entity)}`,
      emails: emails,
    });
  }
}
