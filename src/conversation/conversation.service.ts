import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from '../entities/conversation.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { NotFoundException } from '@nestjs/common';
import {
  CreateConversationType,
  GetConversationType,
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

  async getConversation({ creatorId, participantId }: GetConversationType) {
    const user = await this.userService.findUser(null, creatorId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // const result = await this.participantRepository
    //   .createQueryBuilder('participants')
    //   .select()
    //   .where()
  }

  async createConversation({
    title,
    creatorId,
    participantIds,
  }: CreateConversationType) {
    const user = await this.userService.findUser(null, creatorId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const conversation = new Conversation();
    conversation.title = title;
    conversation.user = user;
    const result = await this.conversationRepository.save(conversation);

    const participantType =
      participantIds.length === 1
        ? ParticipantType.SINGLE
        : ParticipantType.GROUP;

    [...participantIds, result.user.id].map(async (participantId) => {
      const participant = new Participant();
      participant.type = participantType;
      participant.user = await this.userService.findUser(null, participantId);
      participant.conversation = conversation;
      try {
        await this.participantService.createParticipant(participant);
      } catch (error) {
        throw new Error(error);
      }
    });

    return result.id;
  }
}
