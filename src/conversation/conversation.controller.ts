import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConversationService } from './conversation.service';
import { CreateConversationDTO } from './create-conversation.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createConversation(@Body() body: CreateConversationDTO, @Req() req) {
    const { title } = body;

    const id = await this.conversationService.createConversation(
      title,
      req.user.userId,
    );

    return { conversationId: id, success: true };
  }
}
