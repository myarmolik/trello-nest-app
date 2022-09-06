import { Module } from '@nestjs/common';
import { NotifierService } from './notifier.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [NotifierService],
  exports: [NotifierService],
})
export class NotifierModule {}
