import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../users/users.model';
import { Session } from '../sessions/sessions.model';

@Entity()
@ObjectType()
export class Group {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ unique: true })
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  coverUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => User, (user) => user.administeredGroups)
  @JoinTable()
  @Field(() => [User])
  admins: User[];

  @ManyToMany(() => User, (user) => user.joinedGroups)
  @JoinTable()
  @Field(() => [User])
  members: User[];

  @OneToMany(() => Session, (session) => session.group)
  @Field(() => [Session])
  sessions: Session[];
}
