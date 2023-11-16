import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { User } from './users.model';
import { CreateUserInput, UpdateUserInput } from './users.dto';

@Injectable({})
export class UsersService {
  constructor(private dataSource: DataSource) {}

  async createUser(createUserInput: CreateUserInput) {
    try {
      await this.dataSource.getRepository(User).insert(createUserInput);
      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  async getUser(id: number) {
    try {
      return await this.dataSource.getRepository(User).findOneOrFail({
        where: { id },
        relations: {
          administeredGroups: true,
          joinedGroups: true,
          participatedSessions: true,
        },
      });
    } catch (error) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateUser(id: number, updateUserInput: UpdateUserInput) {
    try {
      await this.dataSource.getRepository(User).update(id, updateUserInput);
      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }
}
