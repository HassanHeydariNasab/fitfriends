import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { SessionsService } from './sessions.service';
import { Session } from './sessions.model';
import { CreateSessionInput, UpdateSessionInput } from './sessions.dto';

@Resolver(() => Session)
export class SessionsResolver {
  constructor(private readonly sessionsService: SessionsService) {}

  @Mutation(() => Session)
  createSession(
    @Args('createSessionInput') createSessionInput: CreateSessionInput,
  ) {
    return this.sessionsService.create(createSessionInput);
  }

  @Query(() => [Session], { name: 'sessions' })
  findAll() {
    return this.sessionsService.findAll();
  }

  @Query(() => Session, { name: 'session' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sessionsService.findOne(id);
  }

  @Mutation(() => Session)
  updateSession(
    @Args('updateSessionInput') updateSessionInput: UpdateSessionInput,
  ) {
    return this.sessionsService.update(
      updateSessionInput.id,
      updateSessionInput,
    );
  }

  @Mutation(() => Session)
  removeSession(@Args('id', { type: () => Int }) id: number) {
    return this.sessionsService.remove(id);
  }
}
