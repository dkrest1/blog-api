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
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-guard.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/role.decorator';
import { Role } from '../common/enum/role.enum';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The User has sucessfully viewed profile.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('me')
  async getUser(@Request() req: any): Promise<User> {
    const { id } = req.user;
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'the number of pages of users',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'the number of users per pages',
  })
  @ApiResponse({
    status: 200,
    description: 'Get list of Users on the Application',
  })
  @ApiResponse({ status: 401, description: 'Unforbidden Resource' })
  @Get()
  async getUsers(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<User[]> {
    const users = await this.userService.findUsers(page, limit);
    users.map((user) => {
      delete user.password;
      delete user.authToken;
    });
    return users;
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('admin/updaterole')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBody({ type: [UpdateUserRoleDto] })
  @ApiResponse({
    status: 201,
    description: 'The User Role has been successfully Updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async updateRole(@Body() updateUserRole: UpdateUserRoleDto): Promise<User> {
    return await this.userService.updateUserRole(
      updateUserRole.email,
      updateUserRole.role,
    );
  }
}
