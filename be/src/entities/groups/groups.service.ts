import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Group } from './groups.model';
import { CreateGroupInput, UpdateGroupInput } from './groups.dto';

@Injectable({})
export class GroupsService {
  constructor(private dataSource: DataSource) {}

  async createGroup(createGroupInput: CreateGroupInput): Promise<true> {
    try {
      const insertResult = await this.dataSource
        .getRepository(Group)
        .insert(createGroupInput);
      await this.dataSource
        .createQueryBuilder()
        .relation(Group, 'admins')
        .of(insertResult.identifiers[0].id)
        .add(1);
      return true;
    } catch (error) {
      throw new HttpException(
        'create_group_failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateGroup(
    id: number,
    updateGroupInput: UpdateGroupInput,
  ): Promise<true> {
    try {
      await this.dataSource.getRepository(Group).update(id, updateGroupInput);
      return true;
    } catch (error) {
      throw new HttpException(
        'update_group_failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
