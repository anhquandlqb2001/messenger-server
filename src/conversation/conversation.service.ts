import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from '../entities/conversation.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import {
  CreateConversationType,
  FindConversationType,
} from './conversation.interface';
import { Participant, ParticipantType } from '../entities/participant.entity';
import { ParticipantService } from '../participant/participant.service';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    private readonly participantService: ParticipantService,
    private readonly userService: UserService,
  ) {}

  async getConversation({ creatorId, participantIds }: FindConversationType) {
    const user = await this.userService.findUser(null, creatorId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const participantType =
      participantIds.length === 1
        ? ParticipantType.SINGLE
        : ParticipantType.GROUP;

    const result = await this.participantService.findConversation({
      creatorId,
      participantIds,
      participantType,
    });

    return result;
  }

  async findConversation(id: string) {
    return await this.conversationRepository.findOne(id);
  }

  async getConversations(creatorId: string) {
    return await this.conversationRepository.find({
      where: { user: { id: creatorId } },
      order: { updatedAt: 'DESC' },
      take: 10,
    });
  }

  async createConversation({
    title,
    creatorId,
    participantIds,
  }: CreateConversationType) {
    const user = await this.userService.findUser(null, creatorId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const conversation = new Conversation();
    conversation.title = title;
    conversation.user = user;
    const result = await this.conversationRepository.save(conversation);

    const participantType =
      participantIds.length === 1
        ? ParticipantType.SINGLE
        : ParticipantType.GROUP;

    [...participantIds, creatorId].map(async (participantId) => {
      const participant = new Participant();
      participant.type = participantType;
      participant.user = await this.userService.findUser(null, participantId);
      participant.conversation = result;
      try {
        await this.participantService.createParticipant(participant);
      } catch (error) {
        throw new Error(error);
      }
    });

    return result.id;
  }
}
