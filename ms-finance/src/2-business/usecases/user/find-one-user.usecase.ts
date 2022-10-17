import { UsersErrors } from '@/2-business/errors';
import { IUserRepository } from '@/2-business/repositories';
import {
  IInputFindOneUserDto,
  IOutputFindOneUserDto,
} from '@/2-business/types';
import { left, right } from '@/shared/either';
import { IAbstractUseCase } from '../abstract.usecase';

class FindOneUserUseCase
  implements IAbstractUseCase<IInputFindOneUserDto, IOutputFindOneUserDto>
{
  constructor(private readonly userRepository: IUserRepository) {}

  public async exec(
    input: IInputFindOneUserDto,
  ): Promise<IOutputFindOneUserDto> {
    const user = await this.userRepository.findOneBy({
      columns: input.keys,
      values: input.values,
    });

    if (!user) {
      return left(UsersErrors.userNotFound());
    }

    return right(user);
  }
}

export { FindOneUserUseCase };
