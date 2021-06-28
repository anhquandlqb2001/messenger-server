import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';

@Module({
  imports: [UserModule],
  controllers: [FriendController],
  providers: [FriendService]
})
export class FriendModule {}
