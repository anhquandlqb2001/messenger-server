import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { ParticipantModule } from './participant/participant.module';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    AuthModule,
    ConversationModule,
    ParticipantModule,
    MessageModule,
    FriendModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
