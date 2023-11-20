import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RequestOtpInput {
  @Field()
  phoneNumber: string;
}

@InputType()
export class VerifyOtpInput {
  @Field()
  phoneNumber: string;

  @Field()
  code: string;
}

@InputType()
export class RegisterUserInput {
  @Field()
  verifyOtpInput: VerifyOtpInput;

  @Field()
  createUserInput: Omit<CreateUserInput, 'phoneNumber'>;
}

@InputType()
export class CreateUserInput {
  @Field()
  phoneNumber: string;

  @Field()
  name: string;

  @Field(() => [String], { defaultValue: [] })
  tags: string[];
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  avatarUrl?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
