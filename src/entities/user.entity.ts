import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 16, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 300 })
  password: string;

  @Column({ type: 'varchar', length: 20 })
  firstName: string;

  @Column({ type: 'varchar', length: 20 })
  lastName: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isReported: boolean;

  @Column({ type: 'boolean', default: false })
  isBlocked: boolean;

  @Column({ type: 'text', nullable: true })
  preferences: string;

}