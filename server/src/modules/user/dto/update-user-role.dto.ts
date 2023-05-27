import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/modules/common/enum/role.enum';

export class UpdateUserrole {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: ['admin', 'moderator', 'author', 'subscriber'] })
  @IsEnum(Role)
  role: Role;
}
