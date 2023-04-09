import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    // check if email exist
    const emailExist = await this.userService.findByEmail(createUserDto.email);
    if (emailExist) {
      throw new UnprocessableEntityException('User already exist');
    }

    return await this.userService.create(createUserDto);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    // check if user exist
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return user;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    // find user
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return await this.userService.update(id, {
      ...user,
      ...updateUserDto,
    });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.userService.remove(id);
  }
}
