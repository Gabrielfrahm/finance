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
}
