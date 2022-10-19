import { Either } from '@/shared/either';
import { IError } from '@/shared/error';

interface IInputCreateTokenDto {
  email: string;
  password: string;
}

type IOutputAuthenticationDto = Either<IError, { token: string }>;

export { IInputCreateTokenDto, IOutputAuthenticationDto };
