import { IAuthenticatorService } from '@/2-business/services';
import { sign, verify } from 'jsonwebtoken';

class AuthenticatorService implements IAuthenticatorService {
  public async sign(payload: {
    id: string;
    email: string;
  }): Promise<{ token: string }> {
    const token = await sign(payload, process.env.SECRET_TOKEN as string, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });

    return { token };
  }

  public async verify(token: string): Promise<{ id: string; email: string }> {
    const tokenPayload: any = verify(token, process.env.SECRET_TOKEN as string);
    return { ...tokenPayload, verify: true };
  }
}

export { AuthenticatorService };
