import {
  IInputFindOneUserDto,
  IOutputFindOneUserDto,
} from '@/2-business/types';
import { FindOneUserUseCase } from '@/2-business/usecases/user/find-one-user.usecase';
import { left, right } from '@/shared/either';
import { AbstractController } from '../abstract.controller';

class FindOneByUserController extends AbstractController<
  IInputFindOneUserDto,
  IOutputFindOneUserDto
> {
  constructor(private readonly findOneUserUseCase: FindOneUserUseCase) {
    super();
  }

  public async run(
    inputFindOneByUser: IInputFindOneUserDto,
  ): Promise<IOutputFindOneUserDto> {
    const user = await this.findOneUserUseCase.exec({
      keys: inputFindOneByUser.keys,
      values: inputFindOneByUser.values,
    });
    if (user.isLeft()) {
      return left(user.value);
    }

    return right(user.value);
  }
}

export { FindOneByUserController };
