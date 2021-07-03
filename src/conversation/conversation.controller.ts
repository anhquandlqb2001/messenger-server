import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConversationService } from './conversation.service';
import { CreateConversationDTO } from './dtos/create-conversation.dto';
import { GetConversationDTO } from './dtos/get-conversation.dto';

@UseGuards(JwtAuthGuard)
@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  async createConversation(@Body() body: CreateConversationDTO, @Req() req) {
    const { title, participantIds } = body;

    const id = await this.conversationService.createConversation({
      title,
      creatorId: req.user.userId as string,
      participantIds,
    });

    return { conversationId: id, success: true };
  }

  // @Get()
  // async getConversation(@Body() body: GetConversationDTO, @Req() req) {
  //   const { participantIds } = body;

  //   const conversation = await this.conversationService.getConversation({
  //     creatorId: req.user.userId,
  //     participantIds,
  //   });

  //   return { conversation, success: true };
  // }

  @Get()
  async conversations(@Req() req) {
    const conversations = await this.conversationService.getConversations(
      req.user.userId,
    );

    return { conversations };
  }
}
