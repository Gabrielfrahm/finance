import { UserRepository } from '@/4-framework/repositories';
import { UserModel } from '@/4-framework/typeorm/models';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const userRepositoryInject = {
  provide: UserRepository,
  useFactory: (dataSource: DataSource) => {
    return new UserRepository(dataSource.getRepository(UserModel));
  },
  inject: [getDataSourceToken()],
};
