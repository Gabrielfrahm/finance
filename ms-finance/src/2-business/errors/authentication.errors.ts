import { IError } from '@/shared/error';

export class AuthenticationErrors extends IError {
  public static invalidCredentials(): IError {
    const authenticationError = new AuthenticationErrors({
      code: 401,
      body: {
        code: 'AE-001',
        message: 'Email or password wrong',
        shortMessage: 'wrongCredentials',
      },
    });

    return authenticationError;
  }

  public static invalidToken(): IError {
    const authenticationError = new AuthenticationErrors({
      code: 423,
      body: {
        code: 'AE-002',
        message: 'Token is not valid',
        shortMessage: 'wrongToken',
      },
    });

    return authenticationError;
  }

  public static erroInValidToken(): IError {
    const authenticationError = new AuthenticationErrors({
      code: 500,
      body: {
        code: 'AE-003',
        message: 'Unable to validate token!',
        shortMessage: 'unableValidToken',
      },
    });

    return authenticationError;
  }

  public static tokenCreationError(): IError {
    const authenticationError = new AuthenticationErrors({
      code: 500,
      body: {
        code: 'AE-004',
        message: 'Token creation error',
        shortMessage: 'tokenCreationError',
      },
    });

    return authenticationError;
  }
}
