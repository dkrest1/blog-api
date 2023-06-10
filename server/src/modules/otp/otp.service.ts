import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import * as otp from 'otp-generator';
import { INormalResponse } from '../common/interface/index.interface';
import { hashPassword, comparePassword } from '../common/utils.';
import { VerifyOtpDto } from './dto/verify-otp';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  private generateOTP(): string {
    const OTP = otp.generate(6, {
      upperCaseAlphabets: true,
      specialChars: false,
    });
    return OTP;
  }

  private async sendCodeToEmail(email: string, subject: string, html: string) {
    const message = {
      to: email,
      from: this.configService.get<string>('MAIL_USERNAME'),
      subject: `Blog-API: ${subject}`,
      html,
    };

    try {
      await this.mailerService.sendMail(message);
    } catch (err) {
      throw new HttpException(
        'something went wrong, please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sendOtp(email: string, subject: string): Promise<INormalResponse> {
    const otp = this.generateOTP();
    const text = `<p>Your OTP code is <b>${otp}</b>, Kindly use it to activate your account.</p>`;
    //hashed otp before saving to database
    const hashedOtp = await hashPassword(otp);
    //10mins expiry time
    const expiry = new Date(new Date().getTime() + 10 * 60 * 1000);

    await this.createOtp(email, hashedOtp, expiry);
    await this.sendCodeToEmail(email, subject, text);
    return {
      message: 'OTP sent successfully',
      status: HttpStatus.CREATED,
    };
  }

  async sendToken(
    email: string,
    subject: string,
    html: string,
  ): Promise<INormalResponse> {
    await this.sendCodeToEmail(email, subject, html);
    return {
      message: 'OTP sent successfully',
      status: HttpStatus.CREATED,
    };
  }

  async createOtp(email: string, otp: string, expiry: Date): Promise<void> {
    const existedOtp = await this.otpRepository.findOneBy({
      userEmail: email,
    });

    if (!existedOtp || existedOtp === null) {
      const newOtp = new Otp();
      newOtp.userEmail = email;
      newOtp.otp = otp;
      newOtp.expiry = expiry;
      await this.otpRepository.save(newOtp);
    } else if (existedOtp) {
      existedOtp.otp = otp;
      existedOtp.expiry = expiry;
      await this.otpRepository.save(existedOtp);
    }
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<INormalResponse> {
    const otp = await this.otpRepository.findOneBy({
      userEmail: verifyOtpDto.userEmail,
    });

    if (otp === null || !otp) {
      return {
        message: 'OTP not found',
        status: HttpStatus.NOT_FOUND,
      };
    }

    const optCode = await comparePassword(verifyOtpDto.otp, otp.otp);
    if (otp && !optCode) {
      return {
        message: 'invalid otp',
        status: HttpStatus.NOT_FOUND,
      };
    } else if (otp.expiry <= new Date()) {
      return {
        message: 'OTP has expired',
        status: HttpStatus.NOT_FOUND,
      };
    }

    await this.revokeOtp(verifyOtpDto);
    return {
      message: 'OTP verified successfully',
      status: HttpStatus.ACCEPTED,
    };
  }

  async resendOtp(email: string, subject: string): Promise<INormalResponse> {
    await this.sendOtp(email, subject);
    return {
      message: 'OTP sent successfully',
      status: HttpStatus.CREATED,
    };
  }
  async revokeOtp(verifyOtpDto: VerifyOtpDto): Promise<void> {
    const otp = await this.otpRepository.findOneBy({
      userEmail: verifyOtpDto.userEmail,
    });

    const otpCode = await comparePassword(verifyOtpDto.otp, otp.otp);
    if (!otp || otp === null || !otpCode) {
      throw new HttpException('OTP not found', HttpStatus.NOT_FOUND);
    }
    await this.otpRepository.remove(otp);
  }
}
