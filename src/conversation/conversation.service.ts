import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from '../entities/conversation.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly repository: Repository<Conversation>,
    private readonly userService: UserService,
  ) {}

  async createConversation(title: string, userId: string) {
    const user = await this.userService.findUser(null, userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const conversation = new Conversation();
    conversation.title = title;
    conversation.user = user;
    const result = await this.repository.save(conversation);
    return result.id;
  }
}
