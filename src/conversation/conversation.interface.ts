export interface GetConversationType {
  creatorId: string;
  participantId: string;
}

export interface CreateConversationType {
  title: string,
  creatorId: string;
  participantIds: string[];
}
