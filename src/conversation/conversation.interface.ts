import { ParticipantType } from "../entities/participant.entity";

export interface CreateConversationType {
  title: string,
  creatorId: string;
  participantIds: string[];
}

export interface FindConversationType {
  creatorId: string;
  participantIds: string[];
  participantType?: ParticipantType
}