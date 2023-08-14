import { IsString, IsNotEmpty, MinLength, isString, IsInt, IsDateString } from 'class-validator';

export class CreateBarnDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  location: string;

  @IsString()
  phone: string;
}