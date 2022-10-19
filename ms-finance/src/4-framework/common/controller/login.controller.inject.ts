import { CreateTokenUseCase } from '@/2-business/usecases/authentication/create-token.usecase';
import { LoginController } from '@/3-presentation/controllers/auth/login.controller';

export const loginControllerInject = {
  provide: LoginController,
  useFactory: (createTokenUseCase: CreateTokenUseCase) => {
    return new LoginController(createTokenUseCase);
  },
  inject: [CreateTokenUseCase],
};
