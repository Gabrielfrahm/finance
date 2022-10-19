import { Either } from '@/shared/either';
import { IError } from '@/shared/error';

interface IInputLoginDto {
  email: string;
  password: string;
}

type IOutputLoginDto = Either<IError, { token: string }>;

export { IInputLoginDto, IOutputLoginDto };
