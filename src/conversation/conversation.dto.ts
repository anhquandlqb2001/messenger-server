import { IsObject, IsString } from 'class-validator';
import { Conversation } from '../entities/conversation.entity';
import { UserDTO } from '../user/user.dto';

export class ConversationDTO implements Readonly<ConversationDTO> {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsObject()
  user: UserDTO

  public static create(dto: Partial<ConversationDTO>) {
    const it = new ConversationDTO();
    it.id = dto.id;
    it.title = dto.title;
    it.user = dto.user
    return it;
  }

  public static createFromEntity(entity: Conversation) {
    return this.create({
      id: entity.id,
      title: entity.title,
    });
  }

  public toEntity() {
    const it = new Conversation();
    it.title = this.title;
    it.user = this.user.toEntity();
    return it;
  }
}
