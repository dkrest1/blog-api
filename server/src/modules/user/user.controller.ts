import {
  Controller,
  Post,
  Body,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUserDto.dto';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() user: RegisterUserDto): Promise<UserEntity> {
    // check if user exist
    const existedUser = await this.userService.findByEmail(user.email);

    if (existedUser) {
      throw new UnprocessableEntityException();
    }

    // if no user, create a new user
    return await this.userService.registerUser(user);
  }
}
