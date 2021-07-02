import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message, MessageType } from '../entities/message.entity';
import { Repository } from 'typeorm';
import { ConversationService } from '../conversation/conversation.service';
import { CreateMessageProps } from './message.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly repository: Repository<Message>,
    private readonly conversationService: ConversationService,
    private readonly userService: UserService,
  ) {}

  async createMessage({ messageDto, userId }: CreateMessageProps) {
    const conversation = await this.conversationService.findConversation(
      messageDto.conversationId,
    );

    if (!conversation)
      throw new NotFoundException('Conversation not found with given id');

    const message = new Message();
    message.conversation = conversation;
    message.messageType = MessageType.TEXT;
    message.message = messageDto.message;

    const user = await this.userService.findUser(null, userId);

    if (!user) throw new NotFoundException('User not found');

    message.user = user;
    
    const result = await this.repository.save(message);

    return result;
  }
}
