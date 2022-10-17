import { CreateUserUseCase } from '@/2-business/usecases';
import { FindAllUserUseCase } from '@/2-business/usecases/user/find-all-user.usecase';
import { FindOneUserUseCase } from '@/2-business/usecases/user/find-one-user.usecase';
import {
  CreateUserController,
  FindOneByUserController,
} from '@/3-presentation/controllers';
import { FindAllUserController } from '@/3-presentation/controllers/user/find-all-users.controller';
import { UserRepository } from '@/4-framework/repositories';
import { HasherService } from '@/4-framework/services/hasher/hasher.service';
import { UserModel } from '@/4-framework/typeorm/models';
import { Module } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserRoutes } from '../../rest/routes/user.routes';

@Module({
  imports: [],
  controllers: [UserRoutes],
  providers: [
    {
      provide: UserRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserRepository(dataSource.getRepository(UserModel));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: HasherService,
      useFactory: () => {
        return new HasherService();
      },
    },
    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepository: UserRepository,
        hasherService: HasherService,
      ) => {
        return new CreateUserUseCase(userRepository, hasherService);
      },
      inject: [UserRepository, HasherService],
    },
    {
      provide: FindOneUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new FindOneUserUseCase(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: FindAllUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new FindAllUserUseCase(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: CreateUserController,
      useFactory: (
        createUserUseCase: CreateUserUseCase,
        findOneUserUseCase: FindOneUserUseCase,
      ) => {
        return new CreateUserController(createUserUseCase, findOneUserUseCase);
      },
      inject: [CreateUserUseCase, FindOneUserUseCase],
    },
    {
      provide: FindOneByUserController,
      useFactory: (findOneUserUseCase: FindOneUserUseCase) => {
        return new FindOneByUserController(findOneUserUseCase);
      },
      inject: [FindOneUserUseCase],
    },
    {
      provide: FindAllUserController,
      useFactory: (findAllUserUseCase: FindAllUserUseCase) => {
        return new FindAllUserController(findAllUserUseCase);
      },
      inject: [FindAllUserUseCase],
    },
  ],
})
export class UserModule {}
