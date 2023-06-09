import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResendCodeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
