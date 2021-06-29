import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from '../entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
  ],
  providers: [MessageService, MessageGateway],
  exports: [MessageService]
})
export class MessageModule {}
