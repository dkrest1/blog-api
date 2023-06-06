import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadsService } from './uploads.service';
import { ImagePipe } from '../common/validators/image-pipe.pipe';
import * as path from 'path';
@Controller('upload')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @UploadedFile(new ImagePipe()) file: Express.Multer.File,
  ): Promise<any> {
    return {
      statusCode: 200,
      data: file.path,
    };
  }

  async getProfilePicture(): Promise<any> {
    return;
  }

  async updateProfilePicture(): Promise<any> {
    return;
  }

  async deleteProfilePicture(): Promise<any> {
    return;
  }

  async uploadPostPicture(): Promise<any> {
    return;
  }

  async getPostPicture(): Promise<any> {
    return;
  }

  async updatePostPicture(): Promise<any> {
    return;
  }

  async deletePostPicture(): Promise<any> {
    return;
  }
}
