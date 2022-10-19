import { UsersErrors } from '@/2-business/errors';

import {
  IInputLoginDto,
  IOutputLoginDto,
} from '@/2-business/types/authentication/login-token.dto';
import { CreateTokenUseCase } from '@/2-business/usecases/authentication/create-token.usecase';
import { FindOneUserUseCase } from '@/2-business/usecases/user/find-one-user.usecase';
import { left, right } from '@/shared/either';
import { AbstractController } from '../abstract.controller';

class LoginController extends AbstractController<
  IInputLoginDto,
  IOutputLoginDto
> {
  constructor(
    private readonly createTokenUseCase: CreateTokenUseCase,
    private readonly FindOneUserUseCase: FindOneUserUseCase,
  ) {
    super();
  }

  public async run(input: IInputLoginDto): Promise<IOutputLoginDto> {
    const userResult = await this.FindOneUserUseCase.exec({
      keys: ['email'],
      values: [input.email],
    });

    if (userResult.isLeft()) {
      return left(UsersErrors.userNotFound());
    }

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
