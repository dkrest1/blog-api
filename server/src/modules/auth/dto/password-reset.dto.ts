import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordResetDto {
  @ApiProperty()
  @IsNotEmpty()
  resetToken: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
