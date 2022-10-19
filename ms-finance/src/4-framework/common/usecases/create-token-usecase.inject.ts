import { CreateTokenUseCase } from '@/2-business/usecases/authentication/create-token.usecase';
import { UserRepository } from '@/4-framework/repositories';
import { HasherService } from '@/4-framework/services/hasher/hasher.service';
import { AuthenticatorService } from '@/4-framework/services/login/authenticator.service';

export const createTokenUseCase = {
  provide: CreateTokenUseCase,
  useFactory: (
    authenticatorService: AuthenticatorService,
    userRepository: UserRepository,
    hashService: HasherService,
  ) => {
    return new CreateTokenUseCase(
      authenticatorService,
      userRepository,
      hashService,
    );
  },
  inject: [AuthenticatorService, UserRepository, HasherService],
};
