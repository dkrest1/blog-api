import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { localAuthGuard } from './guards/local-auth.guard';

@ApiTags('user')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(localAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The User has successfully login.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('login')
  async login(@Request() req: any): Promise<{ access_token: string }> {
    return await this.authService.login(req.user);
  }
}
