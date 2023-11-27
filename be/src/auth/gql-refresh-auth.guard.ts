import { AuthGuard } from '@nestjs/passport';

export class GqlRefreshAuthGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
