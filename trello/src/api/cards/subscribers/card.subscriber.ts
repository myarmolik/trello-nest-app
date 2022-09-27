import { Connection, EntitySubscriberInterface, UpdateEvent } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Card } from '../entities/card.entity';
import { UsersService } from '../../users/users.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CardSubscriber implements EntitySubscriberInterface<Card> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly userService: UsersService,
    @Inject('TRELLO_SERVICE') private readonly client: ClientProxy,
  ) {
    connection.subscribers.push(this);
  }

  listenTo(): any {
    return Card;
  }

  async afterUpdate(event: UpdateEvent<Card>): Promise<void> {
    const users = await this.userService.findAll();
    const emails = users.map((u) => u.email);

    this.client.emit('notification', {
      message: `AFTER CARD UPDATED: ${JSON.stringify(event.entity)}`,
      emails: emails,
    });
  }
}
