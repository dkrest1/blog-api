import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { localAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(localAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }
}
