import { IsString } from 'class-validator';
import { Conversation } from '../entities/conversation.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConversationDTO implements Readonly<CreateConversationDTO> {
  @ApiProperty({ required: true })
  @IsString()
  title: string;

  public static create(dto: Partial<CreateConversationDTO>) {
    const it = new CreateConversationDTO();
    it.title = dto.title;
    return it;
  }

  public static createFromEntity(entity: Conversation) {
    return this.create({
      title: entity.title,
    });
  }

  public toEntity() {
    const it = new Conversation();
    it.title = this.title;
    return it;
  }
}
