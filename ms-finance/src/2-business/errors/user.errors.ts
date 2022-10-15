import { IError } from '@/shared/error';

export class UsersErrors extends IError {
  public static entityCreationError(): IError {
    const userErrors = new UsersErrors({
      code: 400,
      body: {
        code: 'UE-001',
        message:
          'Error during creation of the user entity, please try again later',
        shortMessage: 'entityCreationFailed',
      },
    });
    return userErrors;
  }

  public static userEmailAlreadyInUse(): IError {
    const userErrors = new UsersErrors({
      code: 409,
      body: {
        code: 'UE-002',
        message: 'this e-mail already in use, please use another',
        shortMessage: 'entityCreationFailed',
      },
    });
    return userErrors;
  }

  public static userNotFound(): IError {
    const userErrors = new UsersErrors({
      code: 404,
      body: {
        code: 'UE-003',
        message: 'User not found',
        shortMessage: 'useNotFound',
      },
    });
    return userErrors;
  }

  public static userPasswordConfirmationDoesNotMatch(): IError {
    const userErrors = new UsersErrors({
      code: 401,
      body: {
        code: 'UE-004',
        message: 'The password confirmation does not match',
        shortMessage: 'userPasswordConfirmationDoesNotMatch',
      },
    });
    return userErrors;
  }
}
