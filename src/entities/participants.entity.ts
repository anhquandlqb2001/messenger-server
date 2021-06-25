import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

export enum ParticipantType {
  SINGLE, GROUP
}

@Entity({ name: 'participants' })
export class Participant extends BaseEntity {

  @Column({type: 'int'})
  type: ParticipantType

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.user)
  conversation: Conversation;
}
