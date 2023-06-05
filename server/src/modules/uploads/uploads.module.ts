import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [],
})
export class UploadsModule {}
