import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from 'src/auth/current-user.decorator';
import { Public } from 'src/auth/auth.metadata';

import { User } from './users.model';
import { UsersService } from './users.service';
import {
  RegisterUserInput,
  RequestOtpInput,
  UpdateUserInput,
  VerifyOtpInput,
  VerifyOtpResponse,
} from './users.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  async me(@CurrentUser() user: User) {
    console.log({ user });
    return await this.usersService.getUser(user['id']);
  }

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: number) {
    return await this.usersService.getUser(id);
  }

  @Public()
  @Mutation(() => Boolean)
  async requestOTP(@Args('requestOtpInput') requestOtpInput: RequestOtpInput) {
    return await this.usersService.requestOtp(requestOtpInput);
  }

  @Public()
  @Mutation(() => VerifyOtpResponse)
  async verifyOTP(@Args('verifyOtpInput') verifyOtpInput: VerifyOtpInput) {
    return await this.usersService.verifyOtp(verifyOtpInput);
  }

  @Public()
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
