import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetConversationDTO implements Readonly<GetConversationDTO> {
  @ApiProperty({ required: true })
  @IsString()
  participantId: string;
}
