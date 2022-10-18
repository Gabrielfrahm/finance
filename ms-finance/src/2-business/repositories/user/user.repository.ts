import { IUserEntity } from '@/1-domain/entities';
import { IMeta, IPagination } from '../definitions';

type UserEntityKeys = keyof Omit<IUserEntity, 'password'>;

type UserUniqueWhereKeys = keyof Pick<IUserEntity, 'id' | 'email' | 'name'>;

interface IInputFindOneUser {
  columns: UserEntityKeys[];
  values: IUserEntity[UserEntityKeys][];
}
interface IResponseAllUser {
  data: IUserEntity[];
  meta: IMeta;
}
interface IUserRepository {
  create(inputUserEntity: Omit<IUserEntity, 'id'>): Promise<IUserEntity>;
  findOneBy(inputFindUser: IInputFindOneUser): Promise<IUserEntity | void>;
  findAll(pagination?: IPagination): Promise<IResponseAllUser>;
  update(id: string, newData: Partial<IUserEntity>): Promise<IUserEntity>;
  delete(id: string): Promise<void>;
}

export {
  IUserRepository,
  UserUniqueWhereKeys,
  UserEntityKeys,
  IInputFindOneUser,
  IResponseAllUser,
};
