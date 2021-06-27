import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

export enum ParticipantType {
  SINGLE,
  GROUP,
}

@Entity({ name: 'participants' })
export class Participant extends BaseEntity {
  @Column({ type: 'int' })
  type: ParticipantType;

  @ManyToOne(() => User, (user) => user.participants, { nullable: false })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.participants, {
    nullable: false,
  })
  conversation: Conversation;
}
