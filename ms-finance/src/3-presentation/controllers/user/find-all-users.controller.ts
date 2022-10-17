import {
  IInputFindAllUserDto,
  IOutputFindAllUserDto,
} from '@/2-business/types';
import { FindAllUserUseCase } from '@/2-business/usecases/user/find-all-user.usecase';
import { left, right } from '@/shared/either';
import { AbstractController } from '../abstract.controller';

class FindAllUserController extends AbstractController<
  IInputFindAllUserDto,
  IOutputFindAllUserDto
> {
  constructor(private readonly findAllUserUseCase: FindAllUserUseCase) {
    super();
  }

  public async run(
    input?: IInputFindAllUserDto,
  ): Promise<IOutputFindAllUserDto> {
    const userResult = await this.findAllUserUseCase.exec({ ...input });

    if (userResult.isLeft()) {
      return left(userResult.value);
    }
    return right(userResult.value);
  }
}

export { FindAllUserController };
