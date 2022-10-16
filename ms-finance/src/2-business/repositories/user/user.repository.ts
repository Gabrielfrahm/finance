import { IUserEntity } from '@/1-domain/entities';
// import { IPagination } from '../definitions/pagination';

type UserEntityKeys = keyof Omit<IUserEntity, 'password'>;

type UserUniqueWhereKeys = keyof Pick<IUserEntity, 'id' | 'email' | 'name'>;
// interface IInputFindOneUser {
//   columns: UserUniqueWhereKeys[];
//   values: IUserEntity[UserUniqueWhereKeys][];
//   // relations?: IRelation<UserEntityRelationsKeys>;
//   pagination?: IPagination;
// }
interface IInputFindOneUser {
  columns: UserEntityKeys[];
  values: IUserEntity[UserEntityKeys][];
}
interface IUserRepository {
  create(inputUserEntity: Omit<IUserEntity, 'id'>): Promise<IUserEntity>;
  findOneBy(inputFindUser: IInputFindOneUser): Promise<IUserEntity | void>;
}

export {
  IUserRepository,
  UserUniqueWhereKeys,
  UserEntityKeys,
  IInputFindOneUser,
};
