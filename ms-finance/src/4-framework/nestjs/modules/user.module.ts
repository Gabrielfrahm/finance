import { CreateUserUseCase } from '@/2-business/usecases';
import { DeleteUserUseCase } from '@/2-business/usecases/user/delete-user.usecase';
import { FindAllUserUseCase } from '@/2-business/usecases/user/find-all-user.usecase';
import { FindOneUserUseCase } from '@/2-business/usecases/user/find-one-user.usecase';
import { UpdateUserUseCase } from '@/2-business/usecases/user/update-user.usecase';
import {
  CreateUserController,
  FindOneByUserController,
} from '@/3-presentation/controllers';
import { DeleteUserController } from '@/3-presentation/controllers/user/delete-user.controller';
import { FindAllUserController } from '@/3-presentation/controllers/user/find-all-users.controller';
import { UpdateUserController } from '@/3-presentation/controllers/user/update-user.controller';
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
      provide: DeleteUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new DeleteUserUseCase(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (
        userRepository: UserRepository,
        hasherService: HasherService,
      ) => {
        return new UpdateUserUseCase(userRepository, hasherService);
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
      provide: UpdateUserController,
      useFactory: (updateUserUseCase: UpdateUserUseCase) => {
        return new UpdateUserController(updateUserUseCase);
      },
      inject: [UpdateUserUseCase],
    },
    {
      provide: FindOneByUserController,
      useFactory: (findOneUserUseCase: FindOneUserUseCase) => {
        return new FindOneByUserController(findOneUserUseCase);
      },
      inject: [FindOneUserUseCase],
    },
    {
      provide: DeleteUserController,
      useFactory: (deleteUserUseCase: DeleteUserUseCase) => {
        return new DeleteUserController(deleteUserUseCase);
      },
      inject: [DeleteUserUseCase],
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
