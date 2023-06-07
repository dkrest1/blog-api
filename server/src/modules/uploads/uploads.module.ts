import { Module } from '@nestjs/common';
import { ImageUploadService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [UploadsController],
  providers: [ImageUploadService],
  exports: [],
})
export class UploadsModule {}
