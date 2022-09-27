import { Connection, EntitySubscriberInterface, UpdateEvent } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Board } from '../entities/board.entity';
import { UsersService } from '../../users/users.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BoardSubscriber implements EntitySubscriberInterface<Board> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly userService: UsersService,
    @Inject('TRELLO_SERVICE') private readonly client: ClientProxy,
  ) {
    connection.subscribers.push(this);
  }

  listenTo(): any {
    return Board;
  }

  async afterUpdate(event: UpdateEvent<Board>): Promise<void> {
    const users = await this.userService.findAll();
    const emails = users.map((u) => u.email);

    this.client.emit('notification', {
      message: `AFTER BOARD UPDATED: ${JSON.stringify(event.entity)}`,
      emails: emails,
    });
  }
}
