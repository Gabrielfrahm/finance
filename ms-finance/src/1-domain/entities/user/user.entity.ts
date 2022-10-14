import { AbstractEntity } from '../abstract.entity';
import { ITimestamps } from '../definitions';

interface IUserEntity extends ITimestamps {
  id?: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

type InputUserEntity = Pick<IUserEntity, 'name' | 'email' | 'password'>;

class UserEntity extends AbstractEntity<IUserEntity> {
  public static create(props: InputUserEntity): IUserEntity {
    const currentDate = new Date();

    const user = new UserEntity({
      ...props,
      id: undefined,
      created_at: currentDate,
      updated_at: currentDate,
    });

    return user.exportValues();
  }
}

export { UserEntity, IUserEntity, InputUserEntity };
