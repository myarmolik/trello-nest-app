import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { BoardsModule } from '../boards/boards.module';
import { CardSubscriber } from './subscribers/card.subscriber';
import { UsersModule } from '../users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    BoardsModule,
    UsersModule,
    ClientsModule.register([
      {
        name: 'TRELLO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'notifications_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [CardsController],
  providers: [CardsService, CardSubscriber],
})
export class CardsModule {}
