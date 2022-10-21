import { IError } from '@/shared/error';

export interface IAuthenticatorService {
  sign: (payload: { id: string; email: string }) => Promise<{ token: string }>;
  verify: (token: string) => Promise<{ id: string; email: string } | IError>;
}
