import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from '../entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageGateway } from './message.gateway';
import { ConversationModule } from '../conversation/conversation.module';
import { UserModule } from '../user/user.module';
import { MessageController } from './message.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    ConversationModule,
    UserModule,
  ],
  providers: [MessageService, MessageGateway],
  exports: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
