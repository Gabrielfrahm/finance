import { CreateTokenUseCase } from '@/2-business/usecases/authentication/create-token.usecase';
import { FindOneUserUseCase } from '@/2-business/usecases/user/find-one-user.usecase';
import { LoginController } from '@/3-presentation/controllers/auth/login.controller';

export const loginControllerInject = {
  provide: LoginController,
  useFactory: (
    findOneUserUseCase: FindOneUserUseCase,
    createTokenUseCase: CreateTokenUseCase,
  ) => {
    return new LoginController(createTokenUseCase, findOneUserUseCase);
  },
  inject: [FindOneUserUseCase, CreateTokenUseCase],
};
