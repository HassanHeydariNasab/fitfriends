import {
  CanActivate,
  ExecutionContext,
  Global,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC } from './auth.metadata';

@Global()
@Injectable()
export class GqlAuthGuard
  extends AuthGuard('jwt-access')
  implements CanActivate
{
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    switch (context.getType<GqlContextType>()) {
      case 'graphql':
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
      case 'http':
        return context.switchToHttp().getRequest();
      case 'ws':
        return context.switchToWs().getData(); // TODO: check if this works
      case 'rpc':
        return context.switchToRpc().getContext();
    }
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
