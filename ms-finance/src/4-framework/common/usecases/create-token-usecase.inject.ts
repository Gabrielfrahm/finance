import { CreateTokenUseCase } from '@/2-business/usecases/authentication/create-token.usecase';
import { AuthenticatorService } from '@/4-framework/services/login/authenticator.service';

export const createTokenUseCase = {
  provide: CreateTokenUseCase,
  useFactory: (authenticatorService: AuthenticatorService) => {
    return new CreateTokenUseCase(authenticatorService);
  },
  inject: [AuthenticatorService],
};
