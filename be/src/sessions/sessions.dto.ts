import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateSessionInput {
  @Field()
  description: string;

  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field({ nullable: true })
  address?: string;

  @Field(() => Date)
  startAt: Date;

  @Field(() => Date)
  endAt: Date;
}

@InputType()
export class UpdateSessionInput extends PartialType(CreateSessionInput) {
  @Field(() => ID)
  id: number;
}
