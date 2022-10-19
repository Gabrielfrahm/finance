import { UsersErrors } from '@/2-business/errors';
import { AuthenticationErrors } from '@/2-business/errors/authentication.errors';
import { IUserRepository } from '@/2-business/repositories';
import { IAuthenticatorService, IHasherService } from '@/2-business/services';
import {
  IInputCreateTokenDto,
  IOutputAuthenticationDto,
} from '@/2-business/types/authentication/create-token.dto';
import { left, right } from '@/shared/either';
import { find } from 'rxjs';
import { IAbstractUseCase } from '../abstract.usecase';

class CreateTokenUseCase
  implements IAbstractUseCase<IInputCreateTokenDto, IOutputAuthenticationDto>
{
  constructor(
    private readonly authenticatorService: IAuthenticatorService,
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHasherService,
  ) {}

  public async exec(
    input: IInputCreateTokenDto,
  ): Promise<IOutputAuthenticationDto> {
    try {
      const findUser = await this.userRepository.findOneBy({
        columns: ['email'],
        values: [input.email],
      });

      if (!findUser) {
        return left(UsersErrors.userNotFound());
      }

      const comparePassword = await this.hashService.compare(
        input.password,
        findUser.password,
      );

      if (!comparePassword) {
        return left(AuthenticationErrors.invalidCredentials());
      }

      const result = await this.authenticatorService.sign(input);

      return right({ token: result.token });
    } catch (error) {
      console.log(error);
      return left(AuthenticationErrors.tokenCreationError());
    }
  }
}

export { CreateTokenUseCase };
