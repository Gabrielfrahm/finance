import { UserEntity } from '@/1-domain/entities';
import { UsersErrors } from '@/2-business/errors';
import { IUserRepository } from '@/2-business/repositories';
import { IHasherService } from '@/2-business/services';
import {
  IInputCreateUserDto,
  IOutputCreateUserDto,
} from '@/2-business/types/user/create-user.dto';
import { left, right } from '@/shared/either';
import { IAbstractUseCase } from '../abstract.usecase';

export class CreateUserUseCase
  implements IAbstractUseCase<IInputCreateUserDto, IOutputCreateUserDto>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hasherService: IHasherService,
  ) {}

  public async exec(input: IInputCreateUserDto): Promise<IOutputCreateUserDto> {
    if (input.password !== input.passwordConfirmation) {
      return left(UsersErrors.userPasswordConfirmationDoesNotMatch());
    }

    const hashedPassword = await this.hasherService.create(input.password);
    delete input.passwordConfirmation;
    delete input.password;

    const user = UserEntity.create({ ...input, password: hashedPassword });

    try {
      const userEntity = await this.userRepository.create(user);
      return right(userEntity);
    } catch (error) {
      return left(UsersErrors.entityCreationError());
    }
  }
}
