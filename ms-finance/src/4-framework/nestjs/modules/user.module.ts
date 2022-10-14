import { CreateUserUseCase } from '@/2-business/usecases';
import { CreateUserController } from '@/3-presentation/controllers';
import { UserRepository } from '@/4-framework/repositories';
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
      provide: CreateUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new CreateUserUseCase(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: CreateUserController,
      useFactory: (createUserUseCase: CreateUserUseCase) => {
        return new CreateUserController(createUserUseCase);
      },
      inject: [CreateUserUseCase],
    },
  ],
})
export class UserModule {}
