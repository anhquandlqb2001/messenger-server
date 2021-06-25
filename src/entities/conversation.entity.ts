import { Entity, Column, DeleteDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Message } from './message.entity';
import { Participant } from './participants.entity';
import { User } from './user.entity';

@Entity({ name: 'conversation' })
export class Conversation extends BaseEntity {
  @Column({ type: 'varchar', length: 40 })
  title: string;

  @DeleteDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;

  @ManyToOne(() => User, user => user.conversations)
  user: User;

  @OneToMany(() => Message, message => message.conversation)
  messages: Message[];

  @OneToMany(() => Participant, participant => participant.conversation)
  participants: Participant[];
}
