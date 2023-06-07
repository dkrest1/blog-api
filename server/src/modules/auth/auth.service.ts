import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
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
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    if (user.active) {
      throw new HttpException(
        'user is activated already',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
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
        throw new HttpException('invalid OTP', HttpStatus.NOT_FOUND);
      } else if (otpVerifiedResponse.status === 410) {
        throw new HttpException('OTP has expired', HttpStatus.GONE);
      }
    } catch (err) {
      throw new HttpException(
        'something went wrong, please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //verify token
  async verifyTOken(token: string): Promise<User | null> {
    const decoded = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('jWT_SECRET'),
    });
    const user = await this.userService.findById(decoded.sub);

    try {
      if (!user || user === null) {
        throw new HttpException(
          'token could not be verified',
          HttpStatus.BAD_REQUEST,
        );
      }

      delete user.password;
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  //resend otp
  async resendOtp(email: string): Promise<INormalResponse> {
    const subject = 'Account Activation';
    const otp = await this.otpService.resendOtp(email, subject);
    return {
      message: otp.message,
      status: otp.status,
    };
  }
}
