import {
  Controller,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { localAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-guard.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import {
  INormalResponse,
  IRegisterResponse,
} from '../common/interface/index.interface';
import { VerifyUserDataDto } from './dto/verifyUserData.dto';
import { ResendCodeDto } from './dto/resend-code.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBody({ type: [CreateUserDto] })
  @ApiResponse({
    status: 201,
    description: 'The User has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IRegisterResponse> {
    // check if email exist
    const emailExist = await this.userService.findByEmail(createUserDto.email);
    if (emailExist) {
      throw new UnprocessableEntityException('User already exist');
    }

    return await this.authService.register(createUserDto);
  }

  @UseGuards(localAuthGuard)
  @ApiBody({ type: [LoginUserDto] })
  @ApiResponse({
    status: 200,
    description: 'The User has successfully login.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('login')
  async login(@Request() req: any): Promise<{ access_token: string }> {
    return await this.authService.login(req.user);
  }

  @Post('/otp/activate')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBody({ type: [VerifyUserDataDto] })
  @ApiResponse({
    status: 201,
    description: 'User has been activated successfully.',
  })
  @ApiResponse({ status: 422, description: 'user activated already.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Invalid OTP.' })
  @ApiResponse({ status: 410, description: 'Expired OTP.' })
  async activateUser(
    @Body() verifyUserDataDto: VerifyUserDataDto,
  ): Promise<INormalResponse> {
    return await this.authService.activateUser(verifyUserDataDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: [ResendCodeDto] })
  @ApiResponse({
    status: 200,
    description: 'OTP resend successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('otp/resend')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async resendOTP(
    @Body() resendCodeto: ResendCodeDto,
  ): Promise<INormalResponse> {
    return await this.authService.resendOtp(resendCodeto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: [ResendCodeDto] })
  @ApiResponse({
    status: 201,
    description: 'link created for password reset',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('forget/password')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async forgetPassword(
    @Body() resendCodeDto: ResendCodeDto,
  ): Promise<INormalResponse> {
    return await this.authService.forgetPassword(resendCodeDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: [PasswordResetDto] })
  @ApiQuery({
    name: 'token',
    required: true,
    description: 'the token required for password reset',
  })
  @ApiResponse({
    status: 200,
    description: 'password reset successfully',
  })
  @ApiResponse({ status: 401, description: 'unauthorized' })
  @ApiResponse({ status: 404, description: 'user not found' })
  @ApiResponse({ status: 400, description: 'invalid token' })
  @Post('reset/password')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async resetPassword(
    @Query('token') token: string,
    @Body() passwordResetDto: PasswordResetDto,
  ): Promise<INormalResponse> {
    return await this.authService.passwordReset(token, passwordResetDto);
  }
}
