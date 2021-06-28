import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class FriendService {
  constructor(private readonly userService: UserService) {}

  async friends(meId: string) {
    const result = await this.userService.users(meId);
    return result
  }
}
