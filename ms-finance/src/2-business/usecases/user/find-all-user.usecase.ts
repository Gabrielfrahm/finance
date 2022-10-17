import { IUserRepository } from '@/2-business/repositories';
import {
  IInputFindAllUserDto,
  IOutputFindAllUserDto,
} from '@/2-business/types/user/find-all-user.dto';
import { right } from '@/shared/either';
import { IAbstractUseCase } from '../abstract.usecase';

class FindAllUserUseCase
  implements IAbstractUseCase<IInputFindAllUserDto, IOutputFindAllUserDto>
{
  constructor(private readonly userRepository: IUserRepository) {}

  public async exec(
    input?: IInputFindAllUserDto,
  ): Promise<IOutputFindAllUserDto> {
    const users = await this.userRepository.findAll(input.pagination);
    return right(users);
  }
}

export { FindAllUserUseCase };
