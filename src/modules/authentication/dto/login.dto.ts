import {
  IsString,
  IsNotEmpty,
  MinLength,
  isString,
  IsInt,
  IsDateString,
  IsEmail,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
