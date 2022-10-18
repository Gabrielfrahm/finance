import { Either } from '@/shared/either';
import { IError } from '@/shared/error';

interface IInputDeleteUserDto {
  id: string;
}

type IOutputDeleteUserDto = Either<IError, void>;

export { IInputDeleteUserDto, IOutputDeleteUserDto };
