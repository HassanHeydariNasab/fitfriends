import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Group } from 'src/groups/groups.model';
import { Session } from 'src/sessions/sessions.model';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ unique: true })
  @Field()
  phoneNumber: string;

  @Column({ unique: true, nullable: true })
  @Field({ nullable: true })
  email?: string;

  @Column()
  password: string;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  avatarUrl?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bio?: string;

  @Column('simple-array')
  @Field(() => [String])
  tags: string[];

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Group, (group) => group.admins)
  @Field(() => [Group])
  administeredGroups: Group[];

  @ManyToMany(() => Group, (group) => group.members)
  @Field(() => [Group])
  joinedGroups: Group[];

  @ManyToMany(() => Session, (session) => session.participants)
  @Field(() => [Session])
  participatedSessions: Session[];
}
