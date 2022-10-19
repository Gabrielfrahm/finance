import { AuthenticationErrors } from '@/2-business/errors/authentication.errors';
import { IAuthenticatorService } from '@/2-business/services';
import {
  IInputCreateTokenDto,
  IOutputAuthenticationDto,
} from '@/2-business/types/authentication/create-token.dto';
import { left, right } from '@/shared/either';
import { IAbstractUseCase } from '../abstract.usecase';

class CreateTokenUseCase
  implements IAbstractUseCase<IInputCreateTokenDto, IOutputAuthenticationDto>
{
  constructor(private readonly authenticatorService: IAuthenticatorService) {}

  public async exec(
    input: IInputCreateTokenDto,
  ): Promise<IOutputAuthenticationDto> {
    try {
      const result = await this.authenticatorService.sign(input);

      return right({ token: result.token });
    } catch (error) {
      console.log(error);
      return left(AuthenticationErrors.tokenCreationError());
    }
  }
}

export { CreateTokenUseCase };
