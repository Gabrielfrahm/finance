import { IInputDeleteUserDto, IOutputDeleteUserDto } from '@/2-business/types';
import { DeleteUserUseCase } from '@/2-business/usecases/user/delete-user.usecase';
import { left, right } from '@/shared/either';
import { AbstractController } from '../abstract.controller';

class DeleteUserController extends AbstractController<
  IInputDeleteUserDto,
  IOutputDeleteUserDto
> {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {
    super();
  }

  public async run(input: IInputDeleteUserDto): Promise<IOutputDeleteUserDto> {
    const userResult = await this.deleteUserUseCase.exec({
      ...input,
    });
    if (userResult.isLeft()) {
      return left(userResult.value);
    }

    return right(userResult.value);
  }
}

export { DeleteUserController };
