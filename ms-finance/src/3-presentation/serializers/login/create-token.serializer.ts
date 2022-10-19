import { IInputCreateTokenDto } from '@/2-business/types/authentication/create-token.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTokenSerializer implements IInputCreateTokenDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
