import { IUserEntity } from '@/1-domain/entities';
import { IPagination } from '../definitions';

type UserEntityKeys = keyof Omit<IUserEntity, 'password'>;

type UserUniqueWhereKeys = keyof Pick<IUserEntity, 'id' | 'email' | 'name'>;

interface IInputFindOneUser {
  columns: UserEntityKeys[];
  values: IUserEntity[UserEntityKeys][];
}

interface IUserRepository {
  create(inputUserEntity: Omit<IUserEntity, 'id'>): Promise<IUserEntity>;
  findOneBy(inputFindUser: IInputFindOneUser): Promise<IUserEntity | void>;
  findAll(pagination?: IPagination): Promise<IUserEntity[]>;
}

export {
  IUserRepository,
  UserUniqueWhereKeys,
  UserEntityKeys,
  IInputFindOneUser,
};
