import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  userEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  otp: string;
}
