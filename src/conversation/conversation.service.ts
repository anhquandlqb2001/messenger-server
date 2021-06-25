import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from '../entities/conversation.entity';
import { Repository } from 'typeorm';
import { ConversationDTO } from './conversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  async createConversation(conversation: ConversationDTO) {
    const result = await this.conversationRepository.save(
      conversation.toEntity(),
    );
    return result.id;
  }
}
