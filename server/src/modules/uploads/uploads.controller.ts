import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadsService } from './uploads.service';

@Controller('upload')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('me')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/profiles',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadProfilePicture(
    @UploadedFile() file: Express.Multer.File,
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
