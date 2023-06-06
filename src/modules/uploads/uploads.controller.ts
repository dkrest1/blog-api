import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from './uploads.service';
import { Request, Response } from 'express';
import slugify from 'slugify';
import * as fs from 'fs';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Post('me/avatar')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file,
    @Req() req: Request,
  ): Promise<string | Error> {
    // You can change the approach of getting the user id here
    const { userId } = req.body;
    if (!userId) throw new BadRequestException('Invalid UserID');
    const folder = `users/${slugify(userId)}/avatar`;
    try {
      const imagePath = await this.imageUploadService.uploadImage(file, folder);
      return imagePath;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
  @Get('me/avatar')
  async getImage(@Req() req: Request, @Res() response: Response): Promise<any> {
    const { imagePath } = req.body;
    await this.imageUploadService.getImage(
      // to be able to view on browser too, an option for client-side
      imagePath || req.query.imagePath,
      response,
    );
  }

  @Delete('me/avatar')
  async deleteImage(
    @Req() req: Request,
    @Res() response: Response,
  ): Promise<any> {
    const { imagePath } = req.body;
    await this.imageUploadService
      .deleteImage(imagePath)
      .then(() => {
        return { message: 'Image deleted successfully' };
      })
      .catch((error) => {
        if (error instanceof NotFoundException) {
          throw new NotFoundException('Image not found');
        }
        console.log({ errorDeletingImage: error });
        throw error;
      });
  }
}
