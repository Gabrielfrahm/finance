import { IUserEntity } from '@/1-domain/entities';
import {
  IInputFindOneUser,
  IPagination,
  IResponseAllUser,
  IUserRepository,
} from '@/2-business/repositories';
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

  public async findAll(pagination?: IPagination): Promise<IResponseAllUser> {
    const page = pagination.page || 1;
    const take = pagination.take || 5;
    const userQuery = await this.user
      .createQueryBuilder('user')
      .skip((page - 1) * take)
      .take(take);

    const itemCount = await userQuery.getCount();
    const { entities } = await userQuery.getRawAndEntities();
    const pageCount = Math.ceil(itemCount / take);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < pageCount;

    const meta = {
      page: page,
      take: take,
      itemCount,
      pageCount: Math.ceil(itemCount / take),
      hasPreviousPage,
      hasNextPage,
    };

    return {
      data: entities,
      meta,
    };
  }
}
