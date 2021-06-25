import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from '../entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationService } from '../conversation/conversation.service';
import { ParticipantService } from '../participant/participant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    ConversationService,
    ParticipantService,
  ],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [TypeOrmModule, MessageService]
})
export class MessageModule {}
