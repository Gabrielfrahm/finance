import { Either } from '@/shared/either';
import { IError } from '@/shared/error';

export interface IInputVerifyAuthenticateDTO {
  token: string;
}

export type IOutputVerifyAuthenticateDTO = Either<
  IError,
  {
    email: string;
    password: string;
  }
>;
