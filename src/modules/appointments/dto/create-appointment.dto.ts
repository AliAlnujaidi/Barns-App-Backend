import { IsString, IsNotEmpty, MinLength, isString, IsInt, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  @IsNotEmpty()
  trainee: number;

  @IsInt()
  @IsNotEmpty()
  coach: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsInt()
  @IsNotEmpty()
  duration: number;

  @IsInt()
  @IsNotEmpty()
  barn: number;
}