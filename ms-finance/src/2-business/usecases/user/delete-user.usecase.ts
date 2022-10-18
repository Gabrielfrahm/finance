import { UsersErrors } from '@/2-business/errors';
import { IUserRepository } from '@/2-business/repositories';
import { IInputDeleteUserDto, IOutputDeleteUserDto } from '@/2-business/types';
import { left, right } from '@/shared/either';
import { IAbstractUseCase } from '../abstract.usecase';

class DeleteUserUseCase
  implements IAbstractUseCase<IInputDeleteUserDto, IOutputDeleteUserDto>
{
  constructor(private readonly userRepository: IUserRepository) {}
  public async exec(input: IInputDeleteUserDto): Promise<IOutputDeleteUserDto> {
    const findUser = await this.userRepository.findOneBy({
      columns: ['id'],
      values: [input.id],
    });

    if (!findUser) {
      return left(UsersErrors.userNotFound());
    }

    try {
      return right(await this.userRepository.delete(input.id));
    } catch (error) {
      return left(UsersErrors.entityCreationError());
    }
  }
}

export { DeleteUserUseCase };
