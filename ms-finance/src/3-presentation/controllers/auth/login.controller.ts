import {
  IInputLoginDto,
  IOutputLoginDto,
} from '@/2-business/types/authentication/login-token.dto';
import { CreateTokenUseCase } from '@/2-business/usecases/authentication/create-token.usecase';
import { left, right } from '@/shared/either';
import { AbstractController } from '../abstract.controller';

class LoginController extends AbstractController<
  IInputLoginDto,
  IOutputLoginDto
> {
  constructor(private readonly createTokenUseCase: CreateTokenUseCase) {
    super();
  }

  public async run(input: IInputLoginDto): Promise<IOutputLoginDto> {
    const tokenResult = await this.createTokenUseCase.exec({
      email: input.email,
      password: input.password,
    });

    if (tokenResult.isLeft()) {
      return left(tokenResult.value);
    }

    return right(tokenResult.value);
  }
}

export { LoginController };
