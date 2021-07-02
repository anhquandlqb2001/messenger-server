import { Message } from '../../entities/message.entity';

export class ReceiveMessageDTO implements Readonly<ReceiveMessageDTO> {
  message: string;
  userId: string;
  createdAt: Date;
  conversationId: string;

  public static create(dto: Partial<ReceiveMessageDTO>) {
    const it = new ReceiveMessageDTO();
    it.message = dto.message;
    it.userId = dto.userId;
    it.createdAt = dto.createdAt;
    it.conversationId = dto.conversationId;
    return it;
  }

  public static createFromEntity(entity: Message) {
    return this.create({
      message: entity.message,
      userId: entity.user.id,
      createdAt: entity.createdAt,
      conversationId: entity.conversation.id,
    });
  }
}
