import { IUserEntity } from '@/1-domain/entities';
import { Either } from '@/shared/either';
import { IError } from '@/shared/error';

interface IInputUpdateUserDto {
  id: string;
  newData: Partial<IUserEntity>;
}

type IOutputUpdateUserDto = Either<IError, IUserEntity>;

export { IInputUpdateUserDto, IOutputUpdateUserDto };
