import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Request,
  ValidationPipe,
  UsePipes,
  UseGuards,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-guard.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    // check if email exist
    const emailExist = await this.userService.findByEmail(createUserDto.email);
    if (emailExist) {
      throw new UnprocessableEntityException('User already exist');
    }

    return await this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUser(@Request() req: any): Promise<User> {
    const { id } = req.user;
    // check if user exist
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    // remove the user pa
    delete user.password;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async update(
    @Request() req: any,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const { id } = req.user;
    return await this.userService.update(id, {
      ...updateUserDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async remove(@Request() req: any): Promise<string> {
    const { id } = req.user;
    return await this.userService.remove(id);
  }
}
