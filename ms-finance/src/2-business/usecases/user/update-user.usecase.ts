import { UsersErrors } from '@/2-business/errors';
import { IUserRepository } from '@/2-business/repositories';
import { IHasherService } from '@/2-business/services';
import {
  IInputUpdateUserDto,
  IOutputUpdateUserDto,
} from '@/2-business/types/user/update-user.dto';
import { left, right } from '@/shared/either';
import { IAbstractUseCase } from '../abstract.usecase';

class UpdateUserUseCase
  implements IAbstractUseCase<IInputUpdateUserDto, IOutputUpdateUserDto>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasherService: IHasherService,
  ) {}

  public async exec(input: IInputUpdateUserDto): Promise<IOutputUpdateUserDto> {
    const findUser = await this.userRepository.findOneBy({
      columns: ['id'],
      values: [input.id],
    });

    if (!findUser) {
      return left(UsersErrors.userNotFound());
    }

    const compareHashed = await this.hasherService.compare(
      input.newData.password,
      findUser.password,
    );

    if (!compareHashed) {
      const password = await this.hasherService.create(input.newData.password);
      input.newData.password = password;
    } else {
      delete input.newData.password;
    }

    try {
      const userEntity = await this.userRepository.update(
        input.id,
        input.newData,
      );
      return right(userEntity);
    } catch (error) {
      return left(UsersErrors.entityCreationError());
    }
  }
}

export { UpdateUserUseCase };
