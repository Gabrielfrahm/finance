import { IInputCreateUserDto } from '@/2-business/types';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserSerializer implements IInputCreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  public passwordConfirmation: string;

  @IsString()
  @IsOptional()
  public avatar: string;
}
