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
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-guard.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBody({ type: [CreateUserDto] })
  @ApiResponse({
    status: 201,
    description: 'The User has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    // check if email exist
    const emailExist = await this.userService.findByEmail(createUserDto.email);
    if (emailExist) {
      throw new UnprocessableEntityException('User already exist');
    }

    return await this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The User has sucessfully viewed profile.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
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
  @ApiResponse({
    status: 200,
    description: 'The User has successfully been updated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: [UpdateUserDto] })
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
  @ApiResponse({
    status: 200,
    description: 'The User has successfully been deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Delete('me')
  async remove(@Request() req: any): Promise<string> {
    const { id } = req.user;
    return await this.userService.remove(id);
  }
}
