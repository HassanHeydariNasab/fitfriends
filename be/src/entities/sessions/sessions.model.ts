import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Group } from '../groups/groups.model';
import { User } from '../users/users.model';

@Entity()
@ObjectType()
export class Session {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Column({ nullable: true })
  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address?: string;

  @Column('timestamp')
  @Field(() => Date)
  startAt: Date;

  @Column('timestamp')
  @Field(() => Date)
  endAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Group, (group) => group.sessions)
  @Field(() => Group)
  group: Group;

  @ManyToMany(() => User, (user) => user.participatedSessions)
  @JoinTable()
  @Field(() => [User])
  participants: User[];
}
