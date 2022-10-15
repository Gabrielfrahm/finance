import { CreateUserUseCase } from '@/2-business/usecases';
import { CreateUserController } from '@/3-presentation/controllers';
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
      provide: CreateUserController,
      useFactory: (createUserUseCase: CreateUserUseCase) => {
        return new CreateUserController(createUserUseCase);
      },
      inject: [CreateUserUseCase],
    },
  ],
})
export class UserModule {}
