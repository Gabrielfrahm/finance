import { IUserEntity } from '@/1-domain/entities';
import { IUserRepository } from '@/2-business/repositories';
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
}
