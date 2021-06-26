import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from '../entities/participant.entity';
import { Repository } from 'typeorm';
import { GetSingleParticipantType } from './participant.interface';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private readonly repository: Repository<Participant>,
  ) {}

  async createParticipant(participant: Participant): Promise<string> {
    const result = await this.repository.save(participant);
    console.log(result.id);
    return result.id;
  }

  async findSingleParticipant({
    creatorId,
    participantId,
  }: GetSingleParticipantType) {
    const result = await this.repository.find({});
  }
}
