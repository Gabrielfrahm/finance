import { UsersErrors } from '@/2-business/errors';
import {
  IInputCreateUserDto,
  IOutputCreateUserDto,
} from '@/2-business/types/user/create-user.dto';
import { CreateUserUseCase } from '@/2-business/usecases';
import { FindOneUserUseCase } from '@/2-business/usecases/user/find-one-user.usecase';
import { left, right } from '@/shared/either';
import { AbstractController } from '../abstract.controller';

export class CreateUserController extends AbstractController<
  IInputCreateUserDto,
  IOutputCreateUserDto
> {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {
    super();
  }

  public async run(input: IInputCreateUserDto): Promise<IOutputCreateUserDto> {
    const isUserAlreadyRegistered = await this.findOneUserUseCase.exec({
      keys: ['email'],
      values: [input.email],
    });

    if (isUserAlreadyRegistered.isRight()) {
      return left(UsersErrors.userEmailAlreadyInUse());
    }

    if (input.password !== input.passwordConfirmation) {
      return left(UsersErrors.userPasswordConfirmationDoesNotMatch());
    }

    const userResult = await this.createUserUseCase.exec({
      ...input,
    });

    if (userResult.isLeft()) {
      return left(userResult.value);
    }

    return right(userResult.value);
  }
}
