import { Controller, Get, Post, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('/')
  getUser(): string {
    return ' We are doing great';
  }

  @Get(':id')
  getSingleUser(@Param() param): string {
    return `${param.id} is the id of the user`;
  }

  @Post('/create')
  createUser(): string {
    return 'User created successfully';
  }
}
