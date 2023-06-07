import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { promisify } from 'util';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private readonly configService: ConfigService,
  ) {}

  private readonly transport = nodemailer.createTransport({
    host: this.configService.get<string>('MAIL_HOST'),
    port: parseInt(this.configService.get<string>('MAIL_PORT')),
    auth: {
      user: this.configService.get<string>('MAIL_USERNAME'),
      pass: this.configService.get<string>('MAIL_PASSWORD'),
    },
  });
}
