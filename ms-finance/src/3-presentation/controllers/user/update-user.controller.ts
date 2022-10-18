import {
  IInputUpdateUserDto,
  IOutputUpdateUserDto,
} from '@/2-business/types/user/update-user.dto';
import { UpdateUserUseCase } from '@/2-business/usecases/user/update-user.usecase';
import { left, right } from '@/shared/either';
import { AbstractController } from '../abstract.controller';

class UpdateUserController extends AbstractController<
  IInputUpdateUserDto,
  IOutputUpdateUserDto
> {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {
    super();
  }
  public async run(input: IInputUpdateUserDto): Promise<IOutputUpdateUserDto> {
    const userResult = await this.updateUserUseCase.exec({
      ...input,
    });

    if (userResult.isLeft()) {
      return left(userResult.value);
    }

    return right(userResult.value);
  }
}

export { UpdateUserController };
