import { IHasherService } from '@/2-business/services';
import { genSalt, hash, compare } from 'bcrypt';

class HasherService implements IHasherService {
  public async create(s: string): Promise<string> {
    const salt = await genSalt(12);
    const hasher = await hash(s, salt);
    return hasher;
  }

  public async compare(value: string, hashed: string): Promise<boolean> {
    return compare(value, hashed);
  }
}

export { HasherService };
