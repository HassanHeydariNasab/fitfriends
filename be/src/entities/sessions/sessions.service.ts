import { Injectable } from '@nestjs/common';
import { CreateSessionInput, UpdateSessionInput } from './sessions.dto';

@Injectable()
export class SessionsService {
  create(createSessionInput: CreateSessionInput) {
    return 'This action adds a new session';
  }

  findAll() {
    return `This action returns all sessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  update(id: number, updateSessionInput: UpdateSessionInput) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
