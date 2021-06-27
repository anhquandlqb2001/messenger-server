import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from '../entities/participant.entity';
import { getManager, Repository } from 'typeorm';
import { FindConversationType } from 'src/conversation/conversation.interface';

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

  async findConversation({
    creatorId,
    participantIds,
    participantType,
  }: FindConversationType) {
    const result = await getManager().query(
      `SELECT participant."conversationId" FROM participants as participant WHERE participant."userId" = $1 AND participant."type" = $3
        INTERSECT
		    SELECT participant_1."conversationId" FROM participants as participant_1 WHERE participant_1."userId" = ANY($2) AND participant_1."type" = $3`,
      [creatorId, participantIds, participantType],
    );
    /**
 * 
		INTERSECT
		SELECT 'conversationId' FROM participants WHERE 'userId' = ANY($2)
 */
    console.log(result);
    if (result.lenght < 1) {
      throw new NotFoundException();
    }
    return result[0];
  }
}
