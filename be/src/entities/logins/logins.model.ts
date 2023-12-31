import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../users/users.model';

@Entity()
@ObjectType()
export class Login {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  hashedRefreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.logins)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  userId: number;
}
