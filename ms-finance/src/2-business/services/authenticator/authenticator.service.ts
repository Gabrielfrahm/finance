import { IError } from '@/shared/error';

export interface IAuthenticatorService {
  sign: (payload: {
    email: string;
    password: string;
  }) => Promise<{ token: string }>;
  verify: (
    token: string,
  ) => Promise<{ email: string; password: string } | IError>;
}
