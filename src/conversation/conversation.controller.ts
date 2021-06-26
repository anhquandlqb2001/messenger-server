import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConversationService } from './conversation.service';
import { CreateConversationDTO } from './dtos/create-conversation.dto';
import { GetConversationDTO } from './dtos/get-conversation.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async getSingleConversation(@Body() body: GetConversationDTO, @Req() req) {
    const { participantId } = body;

    const id = await this.conversationService.getConversation({
      creatorId: req.user.userId,
      participantId,
    });

    return { conversationId: id, success: true };
  }
}