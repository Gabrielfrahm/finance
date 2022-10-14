import { IUserEntity } from '@/1-domain/entities';

interface IUserRepository {
  create(inputUserEntity: Omit<IUserEntity, 'id'>): Promise<IUserEntity>;
}

export { IUserRepository };
