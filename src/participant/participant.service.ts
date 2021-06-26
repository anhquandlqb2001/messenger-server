import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from '../entities/participant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private readonly repository: Repository<Participant>,
  ) {}

  async createParticipant(participant: Participant): Promise<string> {
    const result = await this.repository.save(participant);
    return result.id;
  }
}
