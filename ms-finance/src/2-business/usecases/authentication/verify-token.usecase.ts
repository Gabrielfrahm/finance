import { AuthenticationErrors } from '@/2-business/errors/authentication.errors';
import { IAuthenticatorService } from '@/2-business/services';
import {
  IInputVerifyAuthenticateDTO,
  IOutputVerifyAuthenticateDTO,
} from '@/2-business/types/authentication/verify-token.dto';
import { left, right } from '@/shared/either';
import { IError } from '@/shared/error';
import { IAbstractUseCase } from '../abstract.usecase';

class VerifyTokenUseCase
  implements
    IAbstractUseCase<IInputVerifyAuthenticateDTO, IOutputVerifyAuthenticateDTO>
{
  constructor(private readonly authenticatorService: IAuthenticatorService) {}
  public async exec(
    input: IInputVerifyAuthenticateDTO,
  ): Promise<IOutputVerifyAuthenticateDTO> {
    try {
      const result = await this.authenticatorService.verify(input.token);
      if (result instanceof IError) {
        return left(AuthenticationErrors.invalidToken());
      }
      return right(result);
    } catch (error) {
      return left(AuthenticationErrors.erroInValidToken());
    }
  }
}

export { VerifyTokenUseCase };
