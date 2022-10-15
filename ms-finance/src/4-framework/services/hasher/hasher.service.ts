import { IHasherService } from '@/2-business/services';
import bcrypt, { genSalt, hash } from 'bcrypt';

class HasherService implements IHasherService {
  public async create(s: string): Promise<string> {
    const salt = await genSalt(12);
    const hasher = await hash(s, salt);
    return hasher;
  }

  public async compare(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed);
  }
}

export { HasherService };
