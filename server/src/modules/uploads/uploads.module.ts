import { Module } from '@nestjs/common';
import { ImageService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { UserModule } from '../user/user.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [UserModule, PostModule],
  controllers: [UploadsController],
  providers: [ImageService],
  exports: [],
})
export class UploadsModule {}
