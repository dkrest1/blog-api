import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as sharp from 'sharp';
import { Response } from 'express';
import { INormalResponse } from '../common/interface/index.interface';

@Injectable()
export class ImageService {
  private readonly publicDir: string = 'public';

  constructor() {
    //to ensure the directory is created
    fsExtra.ensureDirSync(this.publicDir);
  }

  async uploadImage(
    imgId: string,
    file: Express.Multer.File,
    dir: string,
  ): Promise<string> {
    const requiredFormat = ['png', 'jpeg', 'jpg', 'gif', 'webp'];
    //sanitize file extension
    const fileFormat = path.parse(file.originalname).ext.split('.')[1];
    if (!requiredFormat.includes(fileFormat)) {
      throw new HttpException(
        'the required file format are png, jpeg, jpg, webp or gif',
        HttpStatus.BAD_REQUEST,
      );
    }
    //resolve img directory
    const uploadDir = path.join(this.publicDir, dir);
    fsExtra.ensureDirSync(uploadDir);
    //resolve filename and convert to webp
    const filename = imgId + '.webp';
    // optimize img path
    const optimizedImagePath = path.join(uploadDir, filename);
    //resize and save file up
    await sharp(file.buffer)
      .resize(800)
      .webp({ effort: 3 })
      .toFile(optimizedImagePath);
    return path.normalize(optimizedImagePath).replace(/\\/g, '/');
  }

  async getImage(
    folder: string,
    filename: string,
    @Res() response: Response,
  ): Promise<Buffer | any> {
    const resolvedImagePath = path.join(this.publicDir, folder, filename);
    const exists = await fs.promises
      .access(resolvedImagePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
    if (!exists) {
      throw new NotFoundException('Image not found');
    }
    const imageStream = fs.createReadStream(resolvedImagePath);
    response.setHeader('Content-Type', 'image/webp');
    imageStream.pipe(response);
  }

  async updateImage(
    file: Express.Multer.File,
    folder: string,
    filename: string,
  ): Promise<any> {
    const resolvedImagePath = path.join(this.publicDir, folder, filename);

    const exists = await fs.promises
      .access(resolvedImagePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!exists) {
      throw new NotFoundException('Image not found');
    }
    const requiredFormat = ['png', 'jpeg', 'jpg', 'gif', 'webp'];
    const fileFormat = path.parse(file.originalname).ext.split('.')[1];
    if (!requiredFormat.includes(fileFormat)) {
      throw new HttpException(
        'the required file format are png, jpeg, jpg, webp or gif',
        HttpStatus.BAD_REQUEST,
      );
    }
    await sharp(file.buffer)
      .resize(800)
      .webp({ effort: 3 })
      .toFile(resolvedImagePath);
    return path.normalize(resolvedImagePath).replace(/\\/g, '/');
  }

  async deleteImage(
    folder: string,
    filename: string,
  ): Promise<INormalResponse> {
    const resolvedImagePath = path.join(this.publicDir, folder, filename);
    const exists = await fs.promises
      .access(resolvedImagePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
    if (!exists) {
      throw new NotFoundException('Image not found');
    }
    await fs.promises.unlink(resolvedImagePath);
    return {
      message: 'image deleted successfully',
      status: HttpStatus.OK,
    };
  }
}
