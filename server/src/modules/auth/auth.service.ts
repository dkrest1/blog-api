import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { comparePassword } from '../common/utils.';
import { OtpService } from '../otp/otp.service';
import {
  INormalResponse,
  IRegisterResponse,
} from '../common/interface/index.interface';
import { VerifyUserDataDto } from './dto/verifyUserData.dto';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { ResendCodeDto } from './dto/resend-code.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user || !(await comparePassword(password, user.password))) {
      throw new BadRequestException('Invalid Credentials');
    }
    // compare password to hashed passwords
    if (user && (await comparePassword(password, user.password))) {
      // delete password before returning user
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  //registering user on signUp
  async register(createUserDto: CreateUserDto): Promise<IRegisterResponse> {
    const mailSubject = `Account Activation`;
    try {
      const user = await this.userService.create(createUserDto);
      const otpResponse = await this.otpService.sendOtp(
        createUserDto.email,
        mailSubject,
      );
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
        role: user.role,
        active: user.active,
        message: otpResponse.message,
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  //activate user
  async activateUser(
    verifyUserData: VerifyUserDataDto,
  ): Promise<INormalResponse> {
    const user = await this.userService.findByEmail(verifyUserData.userEmail);
    if (!user || user === null) {
      return {
        message: 'user not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    if (user.active) {
      return {
        message: 'user is activated already',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
      };
    }
    try {
      const otpVerifiedResponse = await this.otpService.verifyOtp(
        verifyUserData,
      );
      if (otpVerifiedResponse.status === 202) {
        await this.userService.updateUserSensitive(user.id, { active: true });
        return {
          message: `Dear ${user.lastname} ${user.firstname} your account has been activated successfully`,
          status: HttpStatus.ACCEPTED,
        };
      } else if (otpVerifiedResponse.status === 404) {
        return {
          message: 'invalid OTP',
          status: HttpStatus.NOT_FOUND,
        };
      } else if (otpVerifiedResponse.status === 410) {
        return {
          message: 'OTP has expired',
          status: HttpStatus.GONE,
        };
      }
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'something went wrong, please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //verify token
  async verifyToken(token: string): Promise<User | null> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('jWT_SECRET'),
      });

      const user = await this.userService.findById(decoded.sub);
      if (!user || user === null) {
        throw new HttpException(
          'token could not be verified',
          HttpStatus.BAD_REQUEST,
        );
      }

      delete user.password;
      return user;
    } catch (err) {
      throw new HttpException('invalid token', HttpStatus.BAD_REQUEST);
    }
  }

  //resend otp
  async resendOtp(resendCodeDto: ResendCodeDto): Promise<INormalResponse> {
    const { email } = resendCodeDto;
    const subject = 'Account Activation';
    const otp = await this.otpService.resendOtp(email, subject);
    return {
      message: otp.message,
      status: otp.status,
    };
  }

  async forgetPassword(resendCodeDto: ResendCodeDto): Promise<INormalResponse> {
    const { email } = resendCodeDto;
    const user = await this.userService.findByEmail(email);
    if (!user || user === null) {
      return {
        message: 'user not found',
        status: HttpStatus.BAD_REQUEST,
      };
    }

    if (user.active === false) {
      await this.otpService.resendOtp(email, 'Account Activation');
      return {
        message:
          'Please check your email for OTP to activate your account before performing this action',
        status: HttpStatus.BAD_REQUEST,
      };
    }

    const payload = {
      email,
      sub: user.id,
    };

    const resetToken = await this.jwtService.signAsync(payload);

    await this.userService.updateUserSensitive(user.id, {
      authToken: resetToken,
    });

    const resetLink = `Click the link to reset your password ${process.env.PASSWORD_RESET_URL_LINK}/auth/reset/password?token=${resetToken}`;

    await this.otpService.sendToken(email, 'Password Reset', resetLink);

    return {
      message: `please check your email for your password reset link or  click ${resetLink}`,
      status: HttpStatus.CREATED,
    };
  }

  async passwordReset(
    token: string,
    passwordResetDto: PasswordResetDto,
  ): Promise<INormalResponse> {
    const { password } = passwordResetDto;
    const user = await this.verifyToken(token);

    if (!user || user === null) {
      return {
        message: 'user not found',
        status: HttpStatus.NOT_FOUND,
      };
    }
    if (token !== user.authToken) {
      return {
        message: 'invalid token',
        status: HttpStatus.BAD_REQUEST,
      };
    }

    if (!password) {
      return {
        message: 'please provide a reset password',
        status: HttpStatus.BAD_REQUEST,
      };
    }

    await this.userService.update(user.id, { password });
    await this.userService.updateUserSensitive(user.id, { authToken: null });

    return {
      message: 'password reset successfully',
      status: HttpStatus.CREATED,
    };
  }
}
