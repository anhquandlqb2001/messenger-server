import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from '../entities/participant.entity';
import { Repository } from 'typeorm';
import { ParticipantDTO } from './participant.dto';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private readonly repository: Repository<Participant>,
  ) {}

  async createParticipant(participant: ParticipantDTO): Promise<string> {
    const result = await this.repository.save(participant.toEntity());
    return result.id;
  }
}
