import { IUserEntity } from '@/1-domain/entities';
import { IPagination } from '@/2-business/repositories';
import { Either } from '@/shared/either';
import { IError } from '@/shared/error';

interface IInputFindAllUserDto {
  pagination?: IPagination;
}

type IOutputFindAllUserDto = Either<IError, IUserEntity[]>;

export { IInputFindAllUserDto, IOutputFindAllUserDto };
