import { IsString } from 'class-validator';
import { Message, MessageType } from '../entities/message.entity';

export class CreateMessageDTO implements Readonly<CreateMessageDTO> {
  @IsString()
  message: string;

  @IsString()
  messageType: MessageType;

  public static create(dto: Partial<CreateMessageDTO>) {
    const it = new CreateMessageDTO();
    it.message = dto.message;
    it.messageType = dto.messageType;
    return it;
  }

  public static createFromEntity(entity: Message) {
    return this.create({
      message: entity.message,
      messageType: entity.messageType,
    });
  }

  public toEntity() {
    const it = new Message();
    it.message = this.message;
    it.messageType = this.messageType;
    return it;
  }
}
