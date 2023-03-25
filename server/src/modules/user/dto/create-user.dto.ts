import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  password: string;
}
