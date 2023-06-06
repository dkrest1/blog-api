import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { HttpModule } from '@nestjs/axios';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Otp]), HttpModule],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
