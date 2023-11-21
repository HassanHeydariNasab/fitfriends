import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './users.model';
import { UsersService } from './users.service';
import {
  RegisterUserInput,
  RequestOtpInput,
  UpdateUserInput,
} from './users.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: number) {
    return await this.usersService.getUser(id);
  }

  @Mutation(() => Boolean)
  async requestOTP(@Args('requestOtpInput') requestOtpInput: RequestOtpInput) {
    return await this.usersService.requestOtp(requestOtpInput);
  }

  @Mutation(() => Boolean)
  async registerUser(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ) {
    return await this.usersService.registerUser(registerUserInput);
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.usersService.updateUser(id, updateUserInput);
  }
}
