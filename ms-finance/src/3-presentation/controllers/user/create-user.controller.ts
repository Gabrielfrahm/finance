import {
  IInputCreateUserDto,
  IOutputCreateUserDto,
} from '@/2-business/types/user/create-user.dto';
import { CreateUserUseCase } from '@/2-business/usecases';
import { left, right } from '@/shared/either';
import { AbstractController } from '../abstract.controller';

export class CreateUserController extends AbstractController<
  IInputCreateUserDto,
  IOutputCreateUserDto
> {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {
    super();
  }

  public async run(input: IInputCreateUserDto): Promise<IOutputCreateUserDto> {
    if (input.password !== input.passwordConfirmation) {
      console.log('error password');
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
