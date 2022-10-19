import { IUserEntity } from '@/1-domain/entities';
import { Either } from '@/shared/either';
import { IError } from '@/shared/error';

interface IInputCreateTokenDto {
  email: string;
  password: string;
}

type IOutputAuthenticationDto = Either<
  IError,
  { user: Omit<IUserEntity, 'password'>; token: string }
>;

export { IInputCreateTokenDto, IOutputAuthenticationDto };
