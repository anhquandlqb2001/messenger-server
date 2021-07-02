import { IsString } from 'class-validator';
import { Message } from '../../entities/message.entity';

export class CreateMessageDTO implements Readonly<CreateMessageDTO> {
  @IsString()
  message: string;

  @IsString()
  conversationId: string;

  public static create(dto: Partial<CreateMessageDTO>) {
    const it = new CreateMessageDTO();
    it.message = dto.message;
    return it;
  }

  public static createFromEntity(entity: Message) {
    return this.create({
      message: entity.message,
    });
  }

  public toEntity() {
    const it = new Message();
    it.message = this.message;
    return it;
  }
}
