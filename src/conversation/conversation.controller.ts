import { Controller, Post, Req } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConversationDTO } from './conversation.dto';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async createConversation(@Req() req) {
    const { title, userId } = req.body;

    const user = await this.userService.findPublicUser(userId);

    const id = await this.conversationService.createConversation(
      ConversationDTO.create({
        title,
        user,
      }),
    );
    return { conversationId: id, success: true };
  }
}
