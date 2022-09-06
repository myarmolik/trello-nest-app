import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { BoardsModule } from '../boards/boards.module';
import { NotifierModule } from '../../modules/notifier.module';
import { CardSubscriber } from './subscribers/card.subscriber';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    BoardsModule,
    NotifierModule,
    UsersModule,
  ],
  controllers: [CardsController],
  providers: [CardsService, CardSubscriber],
})
export class CardsModule {}
