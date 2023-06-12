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
import {
  ApiConsumes,
  ApiTags,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './uploads.service';
import { JwtAuthGuard } from '../auth/guards/jwt-guard.guard';
import { INormalResponse } from '../common/interface/index.interface';
import { Folder } from '../common/enum/upload-folder.enum';

@ApiTags('upload Image')
@Controller('image')
export class UploadsController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 400,
    description:
      'Unacceptable file format, acceptable include png, jpegs, jpeg, webp',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File Upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatarImage(
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

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 400,
    description:
      'Unacceptable file format, acceptable include png, jpegs, jpeg, webp',
  })
  @ApiQuery({
    name: 'folder',
    enum: Folder,
    description: 'the folder which the image will be accessed from',
  })
  @ApiQuery({
    name: 'filename',
    description: 'the file name which we are accesing',
  })
  @ApiConsumes('multipart/form-data')
  @Get('view/avatar')
  async getAvatarImage(
    @Query('folder') folder: string,
    @Query('filename') filename: string,
    @Response() res: any,
  ): Promise<any> {
    await this.imageService.getImage(folder, filename, res);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Image updated successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 400,
    description:
      'Unacceptable file format, acceptable include png, jpegs, jpeg, webp',
  })
  @ApiQuery({
    name: 'folder',
    enum: Folder,
    description:
      'the folder which the image to be updated  will be accessed from',
  })
  @ApiQuery({
    name: 'filename',
    description: 'the file name which we are accesing for update',
  })
  @ApiConsumes('multipart/form-data')
  @Patch('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatarImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder: string,
    @Query('filename') filename: string,
  ): Promise<string> {
    return await this.imageService.updateImage(file, folder, filename);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Image deleted successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 400,
    description: 'Image not found',
  })
  @ApiQuery({
    name: 'folder',
    enum: Folder,
    description:
      'the folder which the image to be deleted  will be accessed from',
  })
  @ApiQuery({
    name: 'filename',
    description: 'the file name which we are accesing for deletion',
  })
  @ApiConsumes('multipart/form-data')
  @Delete('avatar')
  async deleteAvatarImage(
    @Query('folder') folder: string,
    @Query('filename') filename: string,
  ): Promise<INormalResponse> {
    return await this.imageService.deleteImage(folder, filename);
  }

  ///////////// Post Image upload route
  @ApiResponse({
    status: 200,
    description: 'Image file path to be accessed.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 400,
    description: 'Image not found',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File Upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload/post')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPostImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
  ): Promise<string | Error> {
    const imgId = req.user.id;
    const imgDir = `posts`;
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

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Image file path to be accessed.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 400,
    description: 'Image not found',
  })
  @ApiQuery({
    name: 'folder',
    enum: Folder,
    description: 'the folder which the image will be saved to',
  })
  @ApiQuery({
    name: 'filename',
    description: 'the file name which you are saving',
  })
  @ApiConsumes('multipart/form-data')
  @Get('view/post')
  async getPostImage(
    @Query('folder') folder: string,
    @Query('filename') filename: string,
    @Response() res: any,
  ): Promise<any> {
    await this.imageService.getImage(folder, filename, res);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Image updated successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 400,
    description:
      'Unacceptable file format, acceptable include png, jpegs, jpeg, webp',
  })
  @ApiQuery({
    name: 'folder',
    enum: Folder,
    description:
      'the folder which the image to be updated  will be accessed from',
  })
  @ApiQuery({
    name: 'filename',
    description: 'the file name which we are accesing for update',
  })
  @ApiConsumes('multipart/form-data')
  @Patch('post')
  @UseInterceptors(FileInterceptor('file'))
  async updatePostImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder: string,
    @Query('filename') filename: string,
  ): Promise<string> {
    return await this.imageService.updateImage(file, folder, filename);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Image deleted successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({
    status: 400,
    description: 'Image not found',
  })
  @ApiQuery({
    name: 'folder',
    enum: Folder,
    description:
      'the folder which the image to be deleted  will be accessed from',
  })
  @ApiQuery({
    name: 'filename',
    description: 'the file name which we are accesing for deletion',
  })
  @ApiConsumes('multipart/form-data')
  @Delete('post')
  async deletePostImage(
    @Query('folder') folder: string,
    @Query('filename') filename: string,
  ): Promise<INormalResponse> {
    return await this.imageService.deleteImage(folder, filename);
  }
}
