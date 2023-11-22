import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  coverUrl?: string;
}

@InputType()
export class UpdateGroupInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  coverUrl?: string;
}
