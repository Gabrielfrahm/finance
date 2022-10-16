import { IUserEntity } from '@/1-domain/entities';
import { IInputFindOneUser, IUserRepository } from '@/2-business/repositories';
import { concatArraysIntoObject } from '@/shared/utils';

import { Repository } from 'typeorm';
import { UserModel } from '../typeorm/models';

export class UserRepository implements IUserRepository {
  constructor(private readonly user: Repository<UserModel>) {}

  public async create(
    inputUserEntity: Omit<IUserEntity, 'id'>,
  ): Promise<IUserEntity> {
    const newUser = this.user.create({
      ...inputUserEntity,
    });
    return this.user.save(newUser);
  }

  public async findOneBy(
    inputFindUser: IInputFindOneUser,
  ): Promise<IUserEntity | void> {
    const { columns, values } = inputFindUser;

    const whereClause = concatArraysIntoObject(columns, values);

    const user = await this.user.findOne({
      where: whereClause,
    });
    if (!user) {
      return;
    }
    return user;
  }
}
