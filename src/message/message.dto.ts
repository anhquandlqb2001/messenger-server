import { IsDate, IsObject, IsString } from 'class-validator';
import { ConversationDTO } from '../conversation/conversation.dto';
import { Message, MessageType } from '../entities/message.entity';
import { UserDTO } from '../user/user.dto';

export class MessageDTO implements Readonly<MessageDTO> {
  @IsString()
  id: string;

  @IsString()
  message: string;

  @IsString()
  messageType: MessageType;

  @IsObject()
  user: UserDTO;

  @IsObject()
  conversation: ConversationDTO;

  @IsDate()
  createdAt: Date;

  public static create(dto: Partial<MessageDTO>) {
    const it = new MessageDTO();
    it.id = dto.id;
    it.message = dto.message;
    it.messageType = dto.messageType;
    it.user = dto.user;
    it.conversation = dto.conversation;
    it.createdAt = dto.createdAt;
    return it;
  }

  public static createFromEntity(entity: Message) {
    return this.create({
      id: entity.id,
      message: entity.message,
      messageType: entity.messageType,
      createdAt: entity.createdAt,
    });
  }

  public toEntity() {
    const it = new Message();
    it.message = this.message;
    it.messageType = this.messageType;
    it.createdAt = this.createdAt;
    it.user = this.user.toEntity();
    it.conversation = this.conversation.toEntity();
    return it;
  }
}
