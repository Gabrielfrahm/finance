import { UserEntity } from '@/1-domain/entities';
import { UsersErrors } from '@/2-business/errors';
import { IUserRepository } from '@/2-business/repositories';
import {
  IInputCreateUserDto,
  IOutputCreateUserDto,
} from '@/2-business/types/user/create-user.dto';
import { left, right } from '@/shared/either';
import { IAbstractUseCase } from '../abstract.usecase';

export class CreateUserUseCase
  implements IAbstractUseCase<IInputCreateUserDto, IOutputCreateUserDto>
{
  constructor(private readonly userRepository: IUserRepository) {}

  public async exec(input: IInputCreateUserDto): Promise<IOutputCreateUserDto> {
    if (input.password !== input.passwordConfirmation) {
      console.log('error');
    }

    const user = UserEntity.create({ ...input, password: input.password });

    try {
      const userEntity = await this.userRepository.create(user);
      return right(userEntity);
    } catch (error) {
      console.log(error);
      return left(UsersErrors.entityCreationError());
    }
  }
}
