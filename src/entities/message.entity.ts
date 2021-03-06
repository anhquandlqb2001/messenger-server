import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';

export enum MessageType {
  TEXT,
  IMAGE,
  VIDEO,
  AUDIO,
}

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  message: string;

  @Column({ type: 'int' })
  messageType: MessageType;

  @ManyToOne(() => User, (user) => user.messages, { nullable: false })
  user: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
    nullable: false,
  })
  conversation: Conversation;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true, default: null })
  deletedAt: Date;
}
