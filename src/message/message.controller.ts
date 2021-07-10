import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessageService } from './message.service';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('conversation/:id')
  async messages(@Param() params) {
    const messages = await this.messageService.messages(params.id);
    
    return { messages: messages };
  }
}
