import { Field, InputType, ObjectType } from '@nestjs/graphql';

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
export class CreateUserInput {
  @Field()
  name: string;

  @Field(() => [String], { defaultValue: [] })
  tags: string[];
}

@InputType()
export class RegisterUserInput {
  @Field()
  verifyOtpInput: VerifyOtpInput;

  @Field()
  createUserInput: CreateUserInput;
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

@ObjectType()
export class Tokens {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@ObjectType()
export class VerifyOtpResponse {
  @Field()
  isRegistered: boolean;

  @Field({ nullable: true })
  tokens?: Tokens;
}

@ObjectType()
export class RegisterResponse {
  @Field()
  tokens: Tokens;
}
