import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from '../entities/conversation.entity';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { UserModule } from '../user/user.module';
import { ParticipantModule } from '../participant/participant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    UserModule,
    ParticipantModule,
  ],
  providers: [ConversationService],
  exports: [ConversationService],
  controllers: [ConversationController],
})
export class ConversationModule {}
