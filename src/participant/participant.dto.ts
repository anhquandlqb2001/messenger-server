// import { IsObject, IsString } from 'class-validator';
// import { PublicUserDTO } from '../user/public-user.dto';
// import { ConversationDTO } from '../conversation/create-conversation.dto';
// import { Participant, ParticipantType } from '../entities/participant.entity';

// export class ParticipantDTO implements Readonly<ParticipantDTO> {
//   @IsString()
//   id: string;

//   @IsString()
//   type: ParticipantType;

//   @IsObject()
//   user: PublicUserDTO;

//   @IsObject()
//   conversation: ConversationDTO;

//   public static create(dto: Partial<ParticipantDTO>) {
//     const it = new ParticipantDTO();
//     it.id = dto.id;
//     it.type = dto.type;
//     it.user = dto.user;
//     it.conversation = dto.conversation;
//     return it;
//   }

//   public static createFromEntity(entity: Participant) {
//     return this.create({
//       id: entity.id,
//       type: entity.type,
//     });
//   }

//   public toEntity() {
//     const it = new Participant();
//     it.type = this.type;
//     it.user = this.user.toEntity();
//     it.conversation = this.conversation.toEntity();
//     return it;
//   }
// }
