import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import otp from 'otp-generator';
import { promisify } from 'util';
import { INormalResponse } from '../common/interface/index.interface';
import { hashPassword, comparePassword } from '../common/utils.';
import { VerifyOtpDto } from './dto/verify-otp';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private readonly configService: ConfigService,
  ) {}

  private generateOTP(): string {
    const OTP = otp.generate(6, {
      upperCaseAlphabets: true,
      specialChars: false,
    });

    return OTP;
  }

  private readonly transport = nodemailer.createTransport({
    host: this.configService.get<string>('MAIL_HOST'),
    port: parseInt(this.configService.get<string>('MAIL_PORT')),
    auth: {
      user: this.configService.get<string>('MAIL_USERNAME'),
      pass: this.configService.get<string>('MAIL_PASSWORD'),
    },
  });

  private async sendOtpToEmail(email: string, subject: string, otp: string) {
    const message = {
      from: this.configService.get<string>('MAIL_USERNAME'),
      to: email,
      subject: `Blog-API: ${subject}`,
      html: `<p>Your OTP code is <b>${otp}</b></p>`,
    };

    //convert the code to an async code using promisify from util module and bind to objevt
    const sendEmailAsync = promisify(
      this.transport.sendMail.bind(this.transport),
    );

    try {
      await sendEmailAsync(message);
      console.log('email sent successfully');
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Something went Wrong, Please try again letter',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sendOtp(email: string, subject: string): Promise<INormalResponse> {
    const otp = this.generateOTP();
    //hashed otp before saving to database
    const hashedOtp = await hashPassword(otp);
    //10mins expiry time
    const expiry = new Date(new Date().getTime() + 10 * 60 * 1000);

    await this.createOtp(email, hashedOtp, expiry);
    await this.sendOtpToEmail(email, subject, otp);
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
    }
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<INormalResponse> {
    const otp = await this.otpRepository.findOneBy({
      userEmail: verifyOtpDto.userEmail,
      otp: verifyOtpDto.otp,
    });

    const optCode = await comparePassword(verifyOtpDto.otp, otp.otp);

    if (!otp || otp === null) {
      throw new HttpException('Invalid OTP', HttpStatus.NOT_FOUND);
    } else if (otp.expiry <= new Date()) {
      throw new HttpException('OTP has expired', HttpStatus.GONE);
    }

    if (!optCode) {
      throw new HttpException('Invalid OTP', HttpStatus.NOT_FOUND);
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
