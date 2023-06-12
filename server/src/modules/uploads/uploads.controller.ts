import {
  Controller,
  Delete,
  Get,
  Query,
  UseGuards,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  Response,
  Patch,
} from '@nestjs/common';
import { ApiBody, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './uploads.service';
import { JwtAuthGuard } from '../auth/guards/jwt-guard.guard';
import { INormalResponse } from '../common/interface/index.interface';

@ApiTags('upload Image')
@Controller('image')
export class UploadsController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
  ): Promise<string | Error> {
    const imgId = req.user.id;
    const imgDir = `avatars`;
    try {
      const imagePath = await this.imageService.uploadImage(
        imgId,
        file,
        imgDir,
      );
      return imagePath;
    } catch (error) {
      return error;
    }
  }

  @Get('view')
  async getImage(
    @Query('folder') folder: string,
    @Query('filename') filename: string,
    @Response() res: any,
  ): Promise<any> {
    await this.imageService.getImage(folder, filename, res);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder: string,
    @Query('filename') filename: string,
  ): Promise<string> {
    return await this.imageService.updateImage(file, folder, filename);
  }

  @Delete()
  async deleteImage(
    @Query('folder') folder: string,
    @Query('filename') filename: string,
  ): Promise<INormalResponse> {
    return await this.imageService.deleteImage(folder, filename);
  }
}
