import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './users.model';
import { UsersService } from './users.service';
import { CreateUserInput, UpdateUserInput } from './users.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: number) {
    return await this.usersService.getUser(id);
  }

  @Mutation(() => Boolean)
  async requestOTP(@Args('phoneNumber') phoneNumber: string) {}

  @Mutation(() => Boolean)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.usersService.createUser(createUserInput);
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    if (updateUserInput.newPassword || updateUserInput.currentPassword) {
      // TODO: check updateUserInput.currentPassword, then set updateUserInput.password to updateUserInput.newPassword
      delete updateUserInput.newPassword;
      delete updateUserInput.currentPassword;
    }
    return await this.usersService.updateUser(id, updateUserInput);
  }
}
